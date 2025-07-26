import { useEffect, useState } from "react";
import type { ReportItem } from "@/pages/reportsPage/_domain";
import { DataTable } from "../../../shared/ui/table/TableCus";
import type { DataTableColumn } from '../../../shared/ui/table/TableCus';
import { fetchReports } from "@/pages/reportsPage/_vm/fetchReposts";

type ReportsTableProps = {};

function createColumn<T>(col: Omit<DataTableColumn<T>, 'dataIndex'> & { dataIndex?: keyof T }): DataTableColumn<T> {
  return col;
}

const columns: DataTableColumn<ReportItem>[] = [
  createColumn({ title: 'Назначение', dataIndex: 'category', key: 'category' }),
  createColumn({
    title: 'Цвет',
    dataIndex: 'color',
    key: 'color',
    render: (text: string) => text || '-',
  }),
  createColumn({ title: 'Ед.изм.', dataIndex: 'unit', key: 'unit' }),
  createColumn({ title: 'Артикул', dataIndex: 'code', key: 'code' }),
  {
    title: 'Сальдо начало периода',
    key: 'startPeriod',
    children: [
      createColumn({ title: 'Кол-во', dataIndex: 'remind_start_amount', key: 'startPeriod_quantity' }),
      createColumn({ title: 'Сумма', dataIndex: 'remind_start_sum', key: 'startPeriod_price' }),
    ],
  },
  {
    title: 'Приход',
    key: 'income',
    children: [
      createColumn({ title: 'Кол-во', dataIndex: 'remind_income_amount', key: 'income_quantity' }),
      createColumn({ title: 'Сумма', dataIndex: 'remind_income_sum', key: 'income_price' }),
    ],
  },
  {
    title: 'Расход',
    key: 'outgo',
    children: [
      createColumn({ title: 'Кол-во', dataIndex: 'remind_outgo_amount', key: 'outgo_quantity' }),
      createColumn({ title: 'Сумма', dataIndex: 'remind_outgo_sum', key: 'outgo_price' }),
    ],
  },
  {
    title: 'Сальдо конец периода',
    key: 'endPeriod',
    children: [
      createColumn({ title: 'Кол-во', dataIndex: 'remind_end_amount', key: 'endPeriod_quantity' }),
      createColumn({ title: 'Сумма', dataIndex: 'remind_end_sum', key: 'endPeriod_price' }),
    ],
  },
];

const ReportsTable: React.FC<ReportsTableProps> = () => {
  const [data, setData] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const reports = await fetchReports();
        setData(reports);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Отчёты по материалам</h2>
      <DataTable<ReportItem> data={data} columns={columns} />
    </div>
  );
};

export default ReportsTable;
