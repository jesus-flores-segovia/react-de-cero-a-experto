import moment from "moment";
import Modal from "react-modal/lib/components/Modal";

Modal.setAppElement("#root");

export const nowDate = moment().minutes(0).seconds(0).add(1, "hours");
export const nowDatePlusOne = nowDate.clone().add(1, "hours");

export const initialEvent = {
  title: "",
  notes: "",
  start: nowDate.toDate(),
  end: nowDatePlusOne.toDate(),
  user: {
    _id: "1234",
    name: "Jesús",
  },
  bgcolor: "#fafafa",
};

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
