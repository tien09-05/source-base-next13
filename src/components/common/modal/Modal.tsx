import { Modal as ModalAntd, ModalProps } from 'antd';
import classNames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

interface MyModalProps {
  title: string;
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  okText?: string;
  cancelText?: string;
}
const Modal = ({
  title,
  open,
  handleOk,
  handleCancel,
  okText = '저장',
  cancelText = '취소',
  ...rest
}: MyModalProps & ModalProps) => {
  return (
    <div className={cx('modalCustom')}>
      <ModalAntd
        title={title}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okText}
        cancelText={cancelText}
        className={cx('modalCustom')}
        closeIcon={
          <div className={cx('close-icon')}>
            닫기 <i className="xi-close"></i>
          </div>
        }
        {...rest}
      >
        <div className={cx('wrapper')}>
          <div className={cx('break-line')}></div>
        </div>
      </ModalAntd>
    </div>
  );
};

export default Modal;
