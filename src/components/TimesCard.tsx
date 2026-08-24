import { useEffect, useState } from "react";
import { useAuth, useTimes } from "../hooks";

interface TimesCardProps {
  case_id: number;
}

export const TimesCard = ({ case_id }: TimesCardProps) => {
  const [avg, setAvg] = useState<number | undefined>(undefined);
  const [best, setBest] = useState<number | undefined>(undefined);
  const {
    getAverage,
    getBest,
    loading,
  } = useTimes();
  const { refreshSession } = useAuth();

  const init = () => {
    getAverage(case_id)
      .then((result) => {
        setAvg(result);
        return getBest(case_id);
      })
      .then((result) => {
        setBest(result);
      })
      .catch((e) => {
        console.error(e);
        if (e instanceof Error && e.name === "TokenExpiredError") {
          refreshSession()
            .then(() => init());
        }
      });
  }

  useEffect(() => {
    init();
  }, [case_id]);
  return (
    <tr key={case_id}>
      <td>{case_id}</td>
      <td>{(loading) ? ("loading") : (avg ?? "")}</td>
      <td>{(loading) ? ("loading") : (best ?? "")}</td>
    </tr>
  )
}