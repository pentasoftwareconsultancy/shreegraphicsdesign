import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: 'Kaustubh Sharma',
    email: 'kaustubhsharma67@gmail.com',
    phone: '91-7543677897',
    avatar: 'https://i.pravatar.cc/150?img=3',
  };


  const InfoRow = ({ label, onEdit }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoText}>{label}</Text>
      {onEdit && (
        <TouchableOpacity onPress={onEdit}>
          <Feather name="edit" size={16} color="orange" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <CustomHeader title="Profile" />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.outlinedButton}
            onPress={() => navigation.navigate('Orders')}
          >
            <Text style={styles.outlinedButtonText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.outlinedButton}
            onPress={() => navigation.navigate('BuyAgain')}
          >
            <Text style={styles.outlinedButtonText}>Buy Again</Text>
          </TouchableOpacity>
        </View>

        {/* User Info Section */}
        <Section title="User Information">
          <View style={styles.userRow}>
            <View style={styles.userInfo}>
              <InfoRow label={user.name} onEdit={() => console.log('Edit name')} />
              <InfoRow label={user.email} onEdit={() => console.log('Edit email')} />
              <InfoRow label={user.phone} onEdit={() => console.log('Edit phone')} />
            </View>

            <View style={styles.avatarContainer}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <TouchableOpacity style={styles.cameraIcon} onPress={() => console.log('Change avatar')}>
                <Feather name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </Section>


        {/* Address Management */}
        <Section title="Address Management">
          <TouchableRow
            text="Saved Addresses"
            icon="chevron-right"
            onPress={() => navigation.navigate('SavedAddresses')}
          />
        </Section>

        {/* Payment Methods */}
        <Section title="Payment Methods">
          <TouchableRow
            text="Add/Remove Payment Methods"
            icon="chevron-right"
            onPress={() => navigation.navigate('PaymentMethods')}
          />
        </Section>

        {/* Customer Support */}
        <Section title="Customer Support">
          <TouchableRow
            text="Help Center / FAQs"
            icon="chevron-right"
            onPress={() => navigation.navigate('Support')}
          />
        </Section>

        {/* Logout / Login */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

// 🔹 Reusable Section Component
const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

// 🔹 Reusable Info Row
const InfoRow = ({ label }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoText}>{label}</Text>
    <Feather name="edit" size={16} color="orange" />
  </View>
);

// 🔹 Reusable Row with Touchable Option
const TouchableRow = ({ text, icon, onPress }) => (
  <TouchableOpacity style={styles.rowItem} onPress={onPress}>
    <Text style={styles.linkText}>{text}</Text>
    <Ionicons name={icon} size={18} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    // backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
  },
  outlinedButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: '#000',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    flex: 1,
    paddingRight: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 15,
    flex: 1,
    color: '#333',
  },
  avatarContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cameraIcon: {
    // backgroundColor: 'orange',
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    right: -4,
    padding: 5,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  linkText: {
    color: '#333',
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: 'orange',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  
  userInfo: {
    flex: 1,
  },
  
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  
  infoText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  
  avatarContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#eee',
  },
  
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'orange',
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  
});
