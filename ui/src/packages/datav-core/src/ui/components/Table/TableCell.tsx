import React, { FC } from 'react';
import { Cell } from 'react-table';
import { Field } from '../../../data';
import { getTextAlign } from './utils';
import { TableFilterActionCallback } from './types';
import { TableStyles } from './styles';

interface Props {
  cell: Cell;
  field: Field;
  tableStyles: TableStyles;
  onCellClick?: TableFilterActionCallback;
}

export const TableCell: FC<Props> = ({ cell, field, tableStyles, onCellClick }) => {
  const filterable = field.config.filterable;
  const cellProps = cell.getCellProps();

  let onClick: ((event: React.SyntheticEvent) => void) | undefined = undefined;

  if (filterable && onCellClick) {
    if (cellProps.style) {
      cellProps.style.cursor = 'pointer';
    }

    onClick = () => onCellClick(cell.column.Header as string, cell.value);
  }

  if (cellProps.style) {
    cellProps.style.textAlign = getTextAlign(field);
  }

  return (
    <div {...cellProps} onClick={onClick} className={tableStyles.tableCellWrapper}>
      {cell.render('Cell', { field, tableStyles })}
    </div>
  );
};
