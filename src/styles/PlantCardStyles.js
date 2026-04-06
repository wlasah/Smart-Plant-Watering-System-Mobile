import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'column',
  },
  cardGrid: {
    marginBottom: 0,
    minHeight: 300,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initials: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#666',
  },
  moistureContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    fontWeight: '600',
  },
  moistureBar: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  moistureFill: {
    height: '100%',
    borderRadius: 4,
  },
  moistureText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  lastWatered: {
    fontSize: 12,
    color: '#999',
    flex: 1,
  },
  waterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginLeft: 8,
  },
  waterButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default styles;
