import { API_BASE_URL } from '../config';
import { usePrivy } from "@privy-io/expo";

// Helper function to parse Privy DID
const parsePrivyId = (privyDid) => {
  return privyDid?.split(':')[2] || privyDid; // Get the ID part after "did:privy:"
};

export const fetchUserProfile = async (privyUserId) => {
  try {
    const parsedId = parsePrivyId(privyUserId);
    console.log('parsedId', parsedId);
    const response = await fetch(`${API_BASE_URL}/api/v1/users/${parsedId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers your backend requires
      },
    });

    if (!response.ok) {
    
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}; 