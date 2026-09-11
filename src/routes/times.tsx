import type { Route } from "@router-types/times";
import type { ReactElement } from "react";
import { useTimes } from "../hooks";
import { redirect } from "react-router";

export const clientLoader = async () => {
  const {
    getSnapshot
  } = useTimes();
  try {
    const snapshot = await getSnapshot()
    return snapshot
  } catch (e) {
    console.error(e);
    throw redirect('/');
  }
}

clientLoader.hydrate = true as const;

export const hydrateFallback = () => {
  return <div>LOADING...</div>
}

export const Times = ({ loaderData }: Route.ComponentProps) => {
  const snapshot = loaderData;
  const renderList = () => {
    if (snapshot === undefined) {
      console.log("WOW")
      return null;
    }
    let list: ReactElement[] = [];
    let row = 1;
    snapshot[0].forEach((item, i) => {
      while (row < item.case_id!) {
        list.push(
          <tr key={row}>
            <td>{row}</td>
            <td></td>
            <td></td>
          </tr>
        )
        row++
      }
      list.push(
        <tr key={item.case_id}>
          <td>{item.case_id}</td>
          <td>{item.ms_elapsed}</td>
          <td>{snapshot[1][i].ms_elapsed}</td>
        </tr>
      )
      row++
    })
    while (list.length < 78) {
      list.push(
        <tr key={list.length+1}>
          <td>{list.length+1}</td>
          <td></td>
          <td></td>
        </tr>
      )
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

export default Times;