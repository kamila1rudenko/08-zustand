'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const TagsMenu = () => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  const handleDropdownClose = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };
  return (
    <div className={css.menuContainer}>
      <button onClick={handleDropdownClose} className={css.menuButton}>
        {dropdownIsOpen ? 'Notes ▴' : 'Notes ▾'}
      </button>
      {dropdownIsOpen && (
        <ul onClick={handleDropdownClose} className={css.menuList}>
          {['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'].map(
            tag => (
              <li key={tag} className={css.menuItem}>
                <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                  {tag}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default TagsMenu;
