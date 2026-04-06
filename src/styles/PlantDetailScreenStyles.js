import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 16,
    paddingVertical: 8,
    width: 60,
  },
  backText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  plantName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  plantType: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  moistureDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  moistureValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  moistureBar: {
    height: 12,
    backgroundColor: '#E8E8E8',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
  },
  moistureFill: {
    height: '100%',
    borderRadius: 6,
  },
  moistureInfo: {
    gap: 8,
  },
  moistureLabel: {
    fontSize: 14,
    color: '#666',
  },
  recommendationText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  careItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  careLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  careValue: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    textAlign: 'right',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyDate: {
    fontSize: 13,
    color: '#666',
  },
  historyAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4CAF50',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  waterButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#FFE8E8',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    height: 20,
  },
});

export default styles;
