import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteShop, updateShop } from '../slices/shopSlies';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import ShopModal from './ShopModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function ShopList({ shop }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (shop.shopName === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [shop.shopName]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateShop({ ...shop, status: checked ? 'incomplete' : 'complete' })
    );
  };

  const handleDelete = () => {
    dispatch(deleteShop(shop.id));
    toast.success('Shop Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                shop.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {shop.shopName}
            </p>
            <p className={styles.time}>
              {format(new Date(shop.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <ShopModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        shop={shop}
      />
    </>
  );
}

export default ShopList;
