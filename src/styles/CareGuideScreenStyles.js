import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  guideCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  guideEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tipsList: {
    padding: 16,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tipBullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 12,
    fontWeight: 'bold',
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  footerText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
    fontWeight: '500',
  },
  spacer: {
    height: 40,
  },
});

export default styles;
