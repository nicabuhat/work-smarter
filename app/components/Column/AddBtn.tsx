"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUrl, updateCpm } from "@/redux/features/columnsSlice";
import URL from "@/models/URL";

export default function AddBtn({ id }: { id: number }): JSX.Element {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state) => state.countryReducer);
  const columns = useAppSelector((state) => state.columnsReducer);
  const [urls, setURLs] = useState([] as string[]);
  const [cpms, setCPMs] = useState([] as any);

  const getURLs = async () => {
    try {
      const res = await fetch(
        `/api/url?country_code=${country.cca2}&subcategory_id=${columns[0].subcategory?.id}`
      );
      const urls = await res.json(); // Use await here

      if (!res.ok) {
        throw new Error("Failed to fetch urls");
      }

      return urls;
    } catch (error) {
      console.error("Catch Error:", error);
    }
  };
  const getCPMs = async () => {
    try {
      const res = await fetch(
        `/api/cpm?country_code=${country.cca2}&region=${country.region}`
      );
      const cpms = await res.json(); // Use await here

      if (!res.ok) {
        throw new Error("Failed to fetch cpms");
      }

      return cpms;
    } catch (error) {
      console.error("Catch Error:", error);
    }
  };

  const handleClick = () => {
    getURLs()
      .then((res: URL[]) => {
        res
          ? setURLs(
              res
                .map((r) => r.url)
                .filter(
                  (s) =>
                    s.endsWith("com") ||
                    s.endsWith("net") ||
                    s.endsWith(`${country.cca2.toLowerCase()}`)
                )
            )
          : setURLs([]);
      })
      .then(() => dispatch(updateUrl({ id: id, urls: urls })))
      .then(() => {
        console.log(columns);
      });

    getCPMs()
      .then((res) => {
        res
          ? setCPMs({
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
            })
          : setCPMs({});
      })
      .then(() => dispatch(updateCpm({ cpm: cpms, id: id })));
  };

  return (
    <button
      className="flex items-center justify-center gap-2 bg-secondary text-white h-full rounded-full px-3"
      onClick={handleClick}
    >
      <i className="fa-solid fa-plus text-base text-white"></i>
      <span>Add Column</span>
    </button>
  );
}
