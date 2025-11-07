import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils/scalingUtils";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  appBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D32F2F",
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(16),
    elevation: moderateScale(4),
  },
  backButton: { paddingRight: moderateScale(10) },
  title: { color: "#fff", fontSize: moderateScale(18), fontWeight: "bold" },

  content: { padding: moderateScale(16) },
  label: { fontSize: moderateScale(16), fontWeight: "600", marginBottom: moderateScale(8), color: "#000" },
  dropdown: {
    borderWidth: moderateScale(1),
    borderColor: "#ccc",
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    justifyContent: "center",
  },
  dropdownText: { fontSize: moderateScale(15), color: "#000" },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    maxHeight: "70%",
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(24),
  },
  modalHeader: { alignItems: "center", marginBottom: moderateScale(10) },
  modalTitle: { fontSize: moderateScale(18), fontWeight: "bold", color: "#D32F2F" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
  },
  searchInput: { flex: 1, paddingVertical: moderateScale(8), paddingHorizontal: moderateScale(8), color: "#000" },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(12),
    borderBottomWidth: moderateScale(1),
    borderColor: "#eee",
  },
  radioCircle: { height: moderateScale(18), width: moderateScale(18), borderRadius: moderateScale(9), borderWidth: moderateScale(2), borderColor: "#D32F2F", marginRight: moderateScale(12) },
  radioSelected: { backgroundColor: "#D32F2F" },
  productText: { fontSize: moderateScale(16), color: "#000" },

  input: { borderWidth: moderateScale(1), borderColor: "#ccc", borderRadius: moderateScale(8), paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(16), fontSize: moderateScale(15), color: "#000" },
  totalBox: { borderWidth: moderateScale(1), borderColor: "#ccc", borderRadius: moderateScale(8), paddingVertical: moderateScale(12), paddingHorizontal: moderateScale(16), backgroundColor: "#f9f9f9" },
  totalText: { fontSize: moderateScale(16), fontWeight: "bold", color: "#000" },
  dateBox: { flexDirection: "row", alignItems: "center", borderWidth: moderateScale(1), borderColor: "#ccc", borderRadius: moderateScale(8), paddingVertical: moderateScale(12), paddingHorizontal: moderateScale(16), backgroundColor: "#fff" },
  dateText: { marginLeft: moderateScale(8), fontSize: moderateScale(15), color: "#000" },

  button: { paddingVertical: moderateScale(14), borderRadius: moderateScale(8), alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: moderateScale(16) },
});
