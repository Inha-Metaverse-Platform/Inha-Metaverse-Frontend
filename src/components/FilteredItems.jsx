import React from "react";
import styles from "../styles/modules/FilteredItems.module.css";

export default function FilteredItems({ selectedFilters, deleteFilter }) {
  return (
    <section className={styles.filtersSection}>
      <section className={styles.contentSection}>
        <div className={styles.warning}>* 최대 6개 분야</div>
        <div className={styles.filterBox}>
          {selectedFilters.map((selectedFilter, idx) => {
            return (
              <div
                key={idx}
                className={styles.filterBtn}
                onClick={() => {
                  deleteFilter(selectedFilter);
                }}
              >
                {selectedFilter} X
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}
