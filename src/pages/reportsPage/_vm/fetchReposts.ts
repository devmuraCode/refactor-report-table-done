import { getToken } from "@/auth/auth";
import api from "../../../shared/lib/api";
import type { ReportItem } from "@/pages/reportsPage/_domain";

export const fetchReports = async (): Promise<ReportItem[]> => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .slice(0, 10);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .slice(0, 10);

  const token = getToken();

  const res = await api.get(
    `/reports/reports/materials?sort=name&start=${start}&end=${end}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data || [];
};
