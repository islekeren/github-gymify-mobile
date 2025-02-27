import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, Platform, ActivityIndicator } from 'react-native';
import { useLogin, usePrivy, useLoginWithOAuth } from "@privy-io/expo";
import { API_BASE_URL } from '../../config';
import colors from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';


const LoginScreen = ({ navigation }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authCheckComplete = useRef(false);
  const { authenticated, ready, user } = usePrivy();
  
  // Primary auth check - runs on mount and when auth state changes
  useEffect(() => {
    let isMounted = true;
    
    const checkAuthState = async () => {
      console.log("Auth check running. Ready:", ready, "Authenticated:", authenticated);
      
      // Only proceed if Privy has initialized
      if (!ready) return;
      
      // If authenticated, navigate away
      if (authenticated) {
        console.log("User already authenticated, redirecting to main app");
        if (isMounted) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainNavigator' }],
          });
        }
        return;
      }
      
      // Auth check complete, user not authenticated
      if (isMounted) {
        authCheckComplete.current = true;
        setIsLoading(false);
      }
    };
    
    checkAuthState();
    
    // Failsafe timeout - if auth check takes too long, show login screen anyway
    const timeout = setTimeout(() => {
      if (isMounted && isLoading) {
        console.log("Auth check timeout reached, showing login screen");
        setIsLoading(false);
      }
    }, 3000); // 3 second timeout
    
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [ready, authenticated, navigation]);
  
  // Secondary auth check - runs periodically as additional safety
  useEffect(() => {
    if (authCheckComplete.current) return;
    
    const interval = setInterval(() => {
      if (authenticated) {
        console.log("Periodic check found authenticated user, redirecting");
        clearInterval(interval);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainNavigator' }],
        });
      }
    }, 1000); // Check every second
    
    return () => clearInterval(interval);
  }, [authenticated, navigation]);

  const { login: privyLogin } = useLogin({
    onSuccess: async (session) => {
      try {
        const parsedId = session.userId.split(':')[2]; // Parse out just the ID
        const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            privyUserId: parsedId, // Send the parsed ID
            email: session.email,
          }),
        });

        // Handle both successful creation and "already exists" as success cases
        if (!response.ok && response.status !== 409) {
          throw new Error('Failed to create user profile');
        }

        navigation.reset({
          index: 0,
          routes: [{ name: 'MainNavigator' }],
        });
      } catch (error) {
        console.error('Error creating user profile:', error);
        setError('Failed to create user profile');
      }
    },
    onError: (err) => {
      console.log(err);
      // If user is already logged in, navigate to MainNavigator instead of showing error
      if (err.message.includes("already logged in")) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainNavigator' }],
        });
        return;
      }
      setError(JSON.stringify(err.message));
    },
  });

  // Add this OAuth hook for Google and Apple login
  const { login: oauthLogin } = useLoginWithOAuth({
    onSuccess: async (session) => {
      try {
        console.log("OAuth session:", JSON.stringify(session)); // Keep this for debugging
        
        // Extract ID correctly from the structure we can now see
        const parsedId = session.id.split(':')[2];
        
        // Get email from the linked_accounts where type is google_oauth or email
        let email = null;
        if (session.linked_accounts && session.linked_accounts.length > 0) {
          // Try to find the OAuth account first
          const oauthAccount = session.linked_accounts.find(
            acc => acc.type === 'google_oauth' || acc.type === 'apple_oauth'
          );
          
          // If no OAuth account found, try to find an email account
          const emailAccount = session.linked_accounts.find(
            acc => acc.type === 'email'
          );
          
          // Set email based on what we found
          if (oauthAccount && oauthAccount.email) {
            email = oauthAccount.email;
          } else if (emailAccount && emailAccount.address) {
            email = emailAccount.address;
          }
        }
        
        if (!email) {
          throw new Error('No email found in authentication response');
        }
        
        // Log what we're about to send to the API for debugging
        console.log("Sending to API:", { privyUserId: parsedId, email });
        
        const response = await fetch(`${API_BASE_URL}/api/v1/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            privyUserId: parsedId,
            email: email,
          }),
        });
        
        // Log the API response for debugging
        const responseText = await response.text();
        console.log("API Response:", response.status, responseText);
        
        // Handle both successful creation (200/201) and "already exists" (409) as success cases
        if (!response.ok && response.status !== 409) {
          throw new Error(`Failed to create user profile: ${response.status} ${responseText}`);
        }

        // If we got here, either user was created or already exists - both valid for login
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainNavigator' }],
        });
      } catch (error) {
        console.error('Error creating user profile:', error);
        setError('Failed to create user profile: ' + error.message);
      }
    },
    onError: (err) => {
      console.log(err);
      if (err.message.includes("already logged in")) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainNavigator' }],
        });
        return;
      }
      setError(JSON.stringify(err.message));
    },
  });

  const handleEmailLogin = async () => {
    setError(""); // Clear any existing errors
    try {
      await privyLogin({ loginMethods: ["email"] });
    } catch (err) {
      // If user is already logged in, navigate to MainNavigator
      if (err.message.includes("already logged in")) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainNavigator' }],
        });
        return;
      }
      setError(JSON.stringify(err.message));
    }
  };

  const handleGoogleLogin = async () => {
    setError(""); // Clear any existing errors
    try {
      await oauthLogin({ provider: "google" });
    } catch (err) {
      if (err.message.includes("already logged in")) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainNavigator' }],
        });
        return;
      }
      setError(JSON.stringify(err.message));
    }
  };

  const handleAppleLogin = async () => {
    setError(""); // Clear any existing errors
    try {
      await oauthLogin({ provider: "apple" });
    } catch (err) {
      if (err.message.includes("already logged in")) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainNavigator' }],
        });
        return;
      }
      setError(JSON.stringify(err.message));
    }
  };

  // If still checking auth state, show loading indicator
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Checking login status...</Text>
      </View>
    );
  }

  // Only show the login UI if we're sure the user is not authenticated
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome Back!</Text>
        <Text style={styles.subHeaderText}>Sign in to continue</Text>
      </View>

      <TouchableOpacity 
        style={[styles.loginButton, styles.emailButton]}
        onPress={handleEmailLogin}
      >
        <Text style={styles.buttonText}>Login with Email</Text>
      </TouchableOpacity>

      {/* Separator */}
      <View style={styles.separator}>
        <View style={styles.separatorLine} />
      </View>

      <TouchableOpacity 
        style={[styles.loginButton, styles.googleButton]}
        onPress={handleGoogleLogin}
      >
        <View style={styles.buttonContent}>
          <Icon name="logo-google" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Login with Google</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.loginButton, styles.appleButton]}
        onPress={handleAppleLogin}
      >
        <View style={styles.buttonContent}>
          <Icon name="logo-apple" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Login with Apple</Text>
        </View>
      </TouchableOpacity>

      {error && (
        <Text style={styles.errorText}>
          Error: {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  headerContainer: {
    marginBottom: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#666666',
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emailButton: {
    backgroundColor: colors.primary,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: '#4285F4',  // Google blue
  },
  appleButton: {
    backgroundColor: '#000000',  // Apple black
  },
  separator: {
    marginTop: 24,
    marginBottom: 24,
    alignItems: 'center',
    width: '100%',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#DDDDDD',
    width: '80%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
});

export default LoginScreen;