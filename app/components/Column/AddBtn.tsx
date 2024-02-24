"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  updateUrl,
  updateCpm,
  updatePublishers,
} from "@/redux/features/columnsSlice";
import URL from "@/models/URL";
import { getCPMs, getPublishers, getURLs } from "@/util/helpers";

export default function AddBtn({ id }: { id: number }): JSX.Element {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state) => state.countryReducer);
  const columns = useAppSelector((state) => state.columnsReducer);
  const currentColumn = columns[columns.findIndex((c) => c.id === id)];
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    if (currentColumn.parent_category?.id === 1) {
      getPublishers(currentColumn)
        .then((res) => {
          return res.map((r: { publisher: string; sub_publisher: string }) => {
            return { publisher: r.publisher, subPublisher: r.sub_publisher };
          });
        })
        .then((res) => {
          const combinedData = res.reduce(
            (
              acc: { publisher: string; subPublishers: string[] }[],
              cur: { publisher: string; subPublisher: string }
            ) => {
              const existingPublisher = acc.find(
                (item: { publisher: string; subPublishers: string[] }) =>
                  item.publisher === cur.publisher
              );
              if (existingPublisher) {
                existingPublisher.subPublishers.push(cur.subPublisher);
              } else {
                acc.push({
                  publisher: cur.publisher,
                  subPublishers: [cur.subPublisher],
                });
              }
              return acc;
            },
            []
          );
          return combinedData;
        })
        .then((res) => {
          dispatch(updatePublishers({ id: id, publishers: res }));
        });
    }

    if (currentColumn.parent_category?.id === 3) {
      getURLs(country, currentColumn)
        .then((res: URL[]) => {
          return res
            .map((r) => r.url)
            .filter(
              (s) =>
                s.endsWith("com") ||
                s.endsWith("net") ||
                s.endsWith(`${country.cca2.toLowerCase()}`)
            );
        })
        .then((res) => dispatch(updateUrl({ id: id, urls: res })));
    }

    getCPMs(country).then((res) => {
      dispatch(
        updateCpm({
          cpm: {
            banner: res
              .filter((r: any) => r.format === "Display")
              .map((r: any) => r.contextual_plus)
              .pop(),
            video: res
              .filter((r: any) => r.format === "Video")
              .map((r: any) => r.contextual_plus)
              .pop(),
            native: res
              .filter((r: any) => r.format === "Display")
              .map((r: any) => r.contextual_plus)
              .pop(),
          },
          id: id,
        })
      );
    });

    setChecked(!checked);
  };

  useEffect(() => {
    console.log(columns);
  }, [columns]);

  return (
    <button
      className="flex items-center justify-center gap-2 bg-secondary text-white h-full rounded-full px-3"
      onClick={handleClick}
      disabled={checked}
    >
      {checked ? (
        <span className="w-8 aspect-square flex items-center justify-center">
          <i className="fa-solid fa-check text-base text-white"></i>
        </span>
      ) : (
        <>
          <i className="fa-solid fa-plus text-base text-white"></i>
          <span>Add Column</span>
        </>
      )}
    </button>
  );
}
