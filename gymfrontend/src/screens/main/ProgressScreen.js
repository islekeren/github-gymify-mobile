import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';

const ProgressScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState('');
  const [weekDates, setWeekDates] = useState([]);
  const [stats, setStats] = useState({
    calories: 0,
    workouts: 0,
    minutes: 0,
    bpm: 0
  });
  
  const [recentWorkout, setRecentWorkout] = useState({
    title: "Full Body Stretching",
    duration: "10 minutes",
    level: "Intermediate"
  });

  // Tarih formatını ayarla
  const formatMonth = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  // Haftanın günlerini hesapla
  const calculateWeekDates = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Pazartesi'den başla
    const monday = new Date(date.setDate(diff));
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(monday);
      nextDate.setDate(monday.getDate() + i);
      week.push({
        day: nextDate.toLocaleString('default', { weekday: 'short' }).charAt(0),
        date: nextDate.getDate(),
        fullDate: new Date(nextDate)
      });
    }
    return week;
  };

  // Seçilen güne göre istatistikleri güncelle
  const updateStats = (date) => {
    // Burada normalde API'den veri çekilecek
    // Şimdilik random değerler oluşturalım
    setStats({
      calories: Math.floor(Math.random() * 1000 + 500),
      workouts: Math.floor(Math.random() * 20 + 5),
      minutes: Math.floor(Math.random() * 200 + 50),
      bpm: Math.floor(Math.random() * 40 + 60)
    });

    // Son antrenmanı da güncelle
    setRecentWorkout({
      title: "Full Body Stretching",
      duration: `${Math.floor(Math.random() * 30 + 10)} minutes`,
      level: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)]
    });
  };

  // Önceki haftaya git
  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  // Sonraki haftaya git
  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  // Tarih seçildiğinde
  const handleDateSelect = (date) => {
    setSelectedDate(date.fullDate);
    updateStats(date.fullDate);
  };

  // Component yüklendiğinde ve selectedDate değiştiğinde
  useEffect(() => {
    setCurrentMonth(formatMonth(selectedDate));
    setWeekDates(calculateWeekDates(new Date(selectedDate)));
    updateStats(selectedDate);
  }, [selectedDate]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, David</Text>
            <Text style={styles.subGreeting}>See your results today!</Text>
          </View>
        </View>

        {/* Calendar Strip */}
        <View style={styles.calendarSection}>
          <View style={styles.monthSelector}>
            <TouchableOpacity onPress={goToPreviousWeek}>
              <Icon name="chevron-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.monthText}>{currentMonth}</Text>
            <TouchableOpacity onPress={goToNextWeek}>
              <Icon name="chevron-forward" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.datesContainer}>
            {weekDates.map((item) => (
              <TouchableOpacity 
                key={item.date}
                style={[
                  styles.dateItem,
                  selectedDate.getDate() === item.date && styles.selectedDate
                ]}
                onPress={() => handleDateSelect(item)}
              >
                <Text style={[
                  styles.dayText,
                  selectedDate.getDate() === item.date && styles.selectedText
                ]}>{item.day}</Text>
                <Text style={[
                  styles.dateText,
                  selectedDate.getDate() === item.date && styles.selectedText
                ]}>{item.date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Circles */}
        <View style={styles.statsContainer}>
          {/* Calories Circle - Large */}
          <View style={styles.mainStatCircle}>
            <View style={styles.circleProgress}>
              <Text style={styles.statValue}>{stats.calories}</Text>
              <Text style={styles.statLabel}>kcal</Text>
            </View>
          </View>

          {/* Small Stat Circles */}
          <View style={styles.smallStatsRow}>
            <View style={[styles.smallStatCircle, styles.workoutCircle]}>
              <Text style={styles.smallStatValue}>{stats.workouts}</Text>
              <Text style={styles.smallStatLabel}>Workout</Text>
            </View>
            
            <View style={[styles.smallStatCircle, styles.minutesCircle]}>
              <Text style={styles.smallStatValue}>{stats.minutes}</Text>
              <Text style={styles.smallStatLabel}>Minutes</Text>
            </View>
            
            <View style={[styles.smallStatCircle, styles.bpmCircle]}>
              <Text style={styles.smallStatValue}>{stats.bpm}</Text>
              <Text style={styles.smallStatLabel}>Bpm</Text>
            </View>
          </View>
        </View>

        {/* Finished Workout */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Finished Workout</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.workoutCard}>
            <View style={styles.workoutImage} />
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutTitle}>{recentWorkout.title}</Text>
              <Text style={styles.workoutMeta}>
                {recentWorkout.duration} | {recentWorkout.level}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  subGreeting: {
    fontSize: 14,
    color: colors.secondary,
  },
  calendarSection: {
    padding: 16,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  dateItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    width: 40,
  },
  selectedDate: {
    backgroundColor: colors.primary,
  },
  dayText: {
    color: colors.secondary,
    fontSize: 12,
    marginBottom: 4,
  },
  dateText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedText: {
    color: colors.text,
  },
  statsContainer: {
    padding: 16,
    alignItems: 'center',
  },
  mainStatCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  circleProgress: {
    alignItems: 'center',
  },
  statValue: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  statLabel: {
    color: colors.secondary,
    fontSize: 16,
  },
  smallStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  smallStatCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutCircle: {
    borderColor: '#34C759', // Yeşil
  },
  minutesCircle: {
    borderColor: '#FF3B30', // Kırmızı
  },
  bpmCircle: {
    borderColor: '#007AFF', // Mavi
  },
  smallStatValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  smallStatLabel: {
    color: colors.secondary,
    fontSize: 12,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
  },
  workoutCard: {
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    overflow: 'hidden',
  },
  workoutImage: {
    height: 150,
    backgroundColor: colors.border,
  },
  workoutInfo: {
    padding: 16,
  },
  workoutTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  workoutMeta: {
    color: colors.secondary,
    fontSize: 14,
  },
});

export default ProgressScreen; 