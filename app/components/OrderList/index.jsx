import React from 'react';
import T from 'prop-types';

import Image from 'app/elements/Image';
import Counter from 'app/elements/Counter';

import getTotals from 'app/utils/orderTotals';
import findItem, { findItemOption } from 'app/utils/orderItem';

import pluralizeWord from 'helpers/pluralizeWord';

import cx from 'classnames';
import css from './index.styl';

function renderItemMeta(fullItem, orderItem) {
  const { countInCart } = orderItem;

  const itemOption = findItemOption(
    fullItem, orderItem,
  );
  const itemTotalPrice = (
    (itemOption.price || 0) * countInCart
  );

  /* eslint-disable-next-line prefer-destructuring */
  let name = fullItem.name;
  if (itemOption.nameRoot && itemOption.endings) {
    name = pluralizeWord(
      itemOption.nameRoot,
      itemOption.endings,
      countInCart,
    );
  } else if (itemOption.name) {
    /* eslint-disable-next-line prefer-destructuring */
    name = itemOption.name;
  } else if (fullItem.nameRoot && fullItem.endings) {
    name = pluralizeWord(
      fullItem.nameRoot,
      fullItem.endings,
      countInCart,
    );
  }

  const itemData = { ...fullItem, ...itemOption };
  return (
    <>
      {`${itemData.piece} ${itemData.entity}`}
      <span className={css.count}>
        {`✕ 
          ${countInCart} 
          ${name} =
          ${itemTotalPrice} руб. 
        `}
      </span>
    </>
  );
}

export default function OrderList(props) {
  const {
    mode,
    order,
    updateOrder,
    isStripesMode,
    shouldShowWholeTotal,
  } = props;

  const guests = Object.keys(order).sort();
  const totals = getTotals(guests, { order });

  return (
    <>
      {guests.map((guest, i) => {
        const color = i % 2 === 0 ? 'grey' : 'white';
        const className = cx(css.guest, {
          [css[`guest${mode}`]]: true,
          [css[color]]: isStripesMode,
        });
        const headlineClassName = cx(css.headline, {
          [css[`headline${mode}`]]: true,
        });
        const itemRowClassName = cx(css.itemRow, {
          [css[`itemRow${mode}`]]: true,
        });
        const itemImageClassName = cx(css.itemImage, {
          [css[`itemImage${mode}`]]: true,
        });
        const itemMetaClassName = cx(css.itemMeta, {
          [css[`itemMeta${mode}`]]: true,
        });
        const itemCountClassName = cx(css.itemCount, {
          [css[`itemCount${mode}`]]: true,
        });
        const counterClassName = cx(css.counter, {
          [css[`counter${mode}`]]: true,
        });

        return (
          <div
            key={`guest-${guest}-order-list`}
            className={className}
          >
            <div className={headlineClassName}>
              { `Гость ${guest}` }
              <span>{ `${totals[guest]} руб.` }</span>
            </div>

            <div className={css.separator} />

            { order[guest].map((orderItem) => {
              const {
                id,
                label,
                countInCart,
              } = orderItem;

              const fullItem = findItem(id, label);
              const { url, title } = fullItem;

              return (
                <div
                  key={`guest-${guest}-item-${id}`}
                  className={itemRowClassName}
                >
                  <Image
                    src={url}
                    alt={title}
                    id={`${id}-item-image`}
                    className={itemImageClassName}
                  />

                  <div className={itemMetaClassName}>
                    { title }
                    <div className={itemCountClassName}>
                      { renderItemMeta(fullItem, orderItem) }
                    </div>

                    {mode === 'modal' && (
                      <Counter
                        minValue={0}
                        value={countInCart}
                        handleChange={nextValue => updateOrder({
                          id,
                          label,
                          guest,
                          amount: nextValue,
                        })}
                        className={css.counter}
                        inputClassName={css.counterInput}
                        buttonClassName={css.counterButton}
                      />
                    )}
                  </div>

                  {mode === 'section' ? (
                    <div className={css.rowActionButtons}>
                      <Counter
                        minValue={0}
                        value={countInCart}
                        handleChange={nextValue => updateOrder({
                          id,
                          label,
                          guest,
                          amount: nextValue,
                        })}
                        className={counterClassName}
                        inputClassName={css.counterInput}
                        buttonClassName={css.counterButton}
                      />
                      <button
                        type="button"
                        className={css.deleteButton}
                        onClick={() => updateOrder({
                          id,
                          label,
                          guest,
                          amount: 0,
                        })}
                      >
                        Убрать
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={css.crossIcon}
                      onClick={() => updateOrder({
                        id,
                        label,
                        guest,
                        amount: 0,
                      })}
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            }) }
          </div>
        );
      })}
      {shouldShowWholeTotal && (
        <div className={cx(css.headline, css.wholeTotal)}>
          Итого
          <span>{`${totals.total} руб.`}</span>
        </div>
      )}
    </>
  );
}

/* eslint-disable */
OrderList.propTypes = {
  order: T.object.isRequired,
  updateOrder: T.func.isRequired,
  isStripesMode: T.bool,
  shouldShowWholeTotal: T.bool,
  mode: T.oneOf(['modal', 'section']),
  className: T.string,
};
OrderList.defaultProps = {
  isStripesMode: false,
  shouldShowWholeTotal: false,
  mode: 'modal',
  className: '',
};
/* eslint-enable */
