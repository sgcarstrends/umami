import { Icon, Button, PopupTrigger, Popup } from 'react-basics';
import classNames from 'classnames';
import { languages } from '@/lib/lang';
import { useLocale } from '@/components/hooks';
import Icons from '@/components/icons';
import styles from './LanguageButton.module.css';

export function LanguageButton() {
  const { locale, saveLocale, dir } = useLocale();
  const items = Object.keys(languages).map(key => ({ ...languages[key], value: key }));

  function handleSelect(value: string, close: () => void, e: MouseEvent) {
    e.stopPropagation();
    saveLocale(value);
    close();
  }

  return (
    <PopupTrigger>
      <Button variant="quiet">
        <Icon>
          <Icons.Globe />
        </Icon>
      </Button>
      <Popup position="bottom" alignment={dir === 'rtl' ? 'start' : 'end'}>
        {(close: () => void) => {
          return (
            <div className={styles.menu}>
              {items.map(({ value, label }) => {
                return (
                  <div
                    key={value}
                    className={classNames(styles.item, { [styles.selected]: value === locale })}
                    onClick={(e: any) => handleSelect(value, close, e)}
                  >
                    <span lang={value}>{label}</span>
                    {value === locale && (
                      <Icon className={styles.icon}>
                        <Icons.Check />
                      </Icon>
                    )}
                  </div>
                );
              })}
            </div>
          );
        }}
      </Popup>
    </PopupTrigger>
  );
}

export default LanguageButton;
