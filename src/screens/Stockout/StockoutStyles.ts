import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D32F2F',
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 4,
  },
  backButton: { paddingRight: 10 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  content: { padding: 16 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  dropdownText: { fontSize: 15, color: '#333' },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  modalHeader: { alignItems: 'center', marginBottom: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#D32F2F' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: { flex: 1, paddingVertical: 8, paddingHorizontal: 8, color: '#000' },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  radioCircle: { height: 18, width: 18, borderRadius: 9, borderWidth: 2, borderColor: '#D32F2F', marginRight: 12 },
  radioSelected: { backgroundColor: '#D32F2F' },
  productText: { fontSize: 16, color: '#333' },

  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16, fontSize: 15, color: '#000' },
  totalBox: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#f9f9f9' },
  totalText: { fontSize: 16, fontWeight: 'bold', color: '#D32F2F' },
  dateBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#fff' },
  dateText: { marginLeft: 8, fontSize: 15, color: '#333' },

  button: { paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
