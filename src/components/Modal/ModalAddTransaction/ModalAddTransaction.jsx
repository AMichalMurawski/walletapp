import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import s from './ModalAddTransaction.module.scss';
import { ModalAddTransactionCheckbox } from './ModalAddTransactioCheckbox';
import { ModalAddTransactionForm } from './ModalAddTransactionForm';
import {
  modalShowAddTransaction,
  modalShowEditTransaction,
} from '../../../redux/modal/modalThunk';
import IconSvg from '../../utils/IconsSvg/IconSvg';

const ModalAddTransaction = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(modalShowAddTransaction(false));
    dispatch(modalShowEditTransaction(false));
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      handleCloseModal();
    }
  };

  const escKeyDown = e => {
    if (e.code === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', escKeyDown);
      document.body.style.overflow = '';
    };
  });

  return (
    <div
      className={s.backdrop}
      onClose={handleCloseModal}
      onClick={handleBackdropClick}
    >
      <div className={s.box}>
        <div className={s.xBtn} onClick={handleCloseModal}>
          <IconSvg icon="close" />
        </div>
        <h2 className={s.title}>Add transaction</h2>
        <ModalAddTransactionCheckbox></ModalAddTransactionCheckbox>
        <ModalAddTransactionForm
          onClick={handleCloseModal}
        ></ModalAddTransactionForm>
        <button className={s.closeBtn} type="button" onClick={handleCloseModal}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default ModalAddTransaction;
