import { type ReactElement } from "react";
import { TimesCard } from "./TimesCard";

export const TimesList = () => {

  const renderList = () => {
    let list: ReactElement[] = [];
    for (let i = 1; i <= 78; i++) {
      list.push(<TimesCard case_id={i} key={i} />);
    }
    return list;
  }

  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th> CASE_ID </th>
            <th> AVERAGE </th>
            <th> BEST </th>
          </tr>
        </thead>
        <tbody>
          {renderList()}
        </tbody>
      </table>
    </>
  )
}