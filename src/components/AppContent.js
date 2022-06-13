import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/modules/app.module.scss';
import ShopList from './ShopList';

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const shopList = useSelector((state) => state.shop.shopList);

  const filterStatus = useSelector((state) => state.shop.filterStatus);
  console.log(shopList);

  const sortedShopList = [...shopList];
  sortedShopList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredShopList = sortedShopList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredShopList && filteredShopList.length > 0 ? (
          filteredShopList.map((shop) => <ShopList key={shop.id} shop={shop} />)
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Shop
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
