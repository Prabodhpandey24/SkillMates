import ReactModal from 'react-modal';

const Popupmodal = ({ isOpen, onClose, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login Popup"
    >
      {children}
    </ReactModal>
  );
};

export default Popupmodal;