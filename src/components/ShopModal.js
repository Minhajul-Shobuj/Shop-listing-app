import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { addShop, updateShop } from '../slices/shopSlies';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function ShopModal({ type, modalOpen, setModalOpen, shop }) {
  const dispatch = useDispatch();
  const [shopName, setshopName] = useState('');
  const [area, setArea] = useState('');
  const [openingTime, setOpeningTime] = useState('');
  const [closingTime, setClosingTime] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (type === 'update' && shop) {
      setshopName(shop.shopName);
      setArea(shop.area);
      setOpeningTime(shop.openingTime);
      setClosingTime(shop.closingTime);
      setCategory(shop.category);
    } else {
      setshopName('');
      setArea('');
      setOpeningTime('');
      setClosingTime('');
      setCategory('');
    }
  }, [type, shop, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shopName === '') {
      toast.error('Please enter a name');
      return;
    }
    if (shopName && area && category && openingTime && closingTime) {
      if (type === 'add') {
        dispatch(
          addShop({
            id: uuid(),
            shopName,
            area,
            openingTime,
            closingTime,
            category,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Shop added successfully');
      }
      // update shop data
      if (type === 'update') {
        if (shop.shopName !== shopName) {
          dispatch(updateShop({ ...shop, shopName }));
          toast.success('Task Updated successfully');
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} Shop
              </h1>
              <label htmlFor="title">
                Name
                <input
                  pattern="^[A-Za-z]+[A-Za-z ]*$"
                  type="text"
                  id="shopName"
                  value={shopName}
                  onChange={(e) => setshopName(e.target.value)}
                />
              </label>
              <label htmlFor="location">
                Area
                <select
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option value="select">Select</option>
                  <option value="thane">Thane</option>
                  <option value="pune">Pune</option>
                  <option value="mumbai suburban">Mumbai Suburban</option>
                  <option value="nashik">Nashik</option>
                  <option value="nagpur">Nagpur</option>
                  <option value="ahmednagar">Ahmednagar</option>
                  <option value="solapur">Solapur</option>
                </select>
              </label>
              <label htmlFor="time">
                Open
                <input
                  type="time"
                  id="openingTime"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
              </label>
              <label htmlFor="time">
                Close
                <input
                  type="time"
                  id="closingTime"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                Category
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="select">Select</option>
                  <option value="grocery">Grocery</option>
                  <option value="butcher">Butcher</option>
                  <option value="baker">Baker</option>
                  <option value="chemist">Chemist</option>
                  <option value="stationery">Stationery shop</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Shop' : 'Update Shop'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ShopModal;
