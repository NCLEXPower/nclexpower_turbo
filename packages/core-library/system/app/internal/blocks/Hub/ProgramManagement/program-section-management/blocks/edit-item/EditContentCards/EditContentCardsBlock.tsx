/**
* Property of the Arxon Solutions, LLC.
* Reuse as a whole or in part is prohibited without permission.
* Created by the Software Strategy & Development Division
*/
import { ComponentLoader } from "../../../../../../../../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SectionFormType,
  SectionDataIdAtom,
  contentCardsSchema,
  SectionTypeAtom,
} from "../../../validation";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import * as yup from "yup";
import { EditContentCardsField } from "./EditContentCardsField";
import { useBusinessQueryContext } from "../../../../../../../../../../contexts";
import { SectionDataType } from "../../../types";

interface EditContentCardsProps {
  section?: string;
  contentLoader?: boolean;
  onSubmit: (values: SectionFormType) => void;
  isLoading?: boolean;
}

const normalizeLinkValue = (link: string | File[] | undefined): File[] => {
  if (Array.isArray(link)) {
    return link;
  }

  if (typeof link === "string") {
    const blob = new Blob([], { type: "text/plain" });
    return [new File([blob], link)];
  }

  return [];
};

export const EditContentCardsBlock: React.FC<EditContentCardsProps> = ({
  section,
  contentLoader,
  onSubmit,
  isLoading,
}) => {
  const [sectionDataId] = useAtom(SectionDataIdAtom);
  const [sectionType] = useAtom(SectionTypeAtom);

  const { businessQueryGetSectionsByType } = useBusinessQueryContext();
  const { data: sectionsList } = businessQueryGetSectionsByType(
    ["section_type_api"],
    { sectionType }
  );

  const selectedSectionData = useMemo(() => {
    if (!Array.isArray(sectionsList)) return null;

    for (const section of sectionsList) {
      const foundData = section.sectionData.find(
        (data: SectionDataType) => data.sectionDataId === sectionDataId
      );
      if (foundData) return foundData;
    }

    return null;
  }, [sectionsList, section, sectionDataId]);

  const defaultValues = useMemo(() => {
    if (selectedSectionData && isContentCardsSectionData(selectedSectionData)) {
      return {
        title: selectedSectionData.title,
        cards: selectedSectionData.cards.map((card) => ({
          cardId: card.cardId,
          cardTopic: card.cardTopic,
          cardFaces: card.cardFaces || [],
        })),
      };
    }
    return {
      title: "",
      cards: [],
    };
  }, [selectedSectionData]);

  const [topics, setTopics] = useState<
    { cardTopic: string; cardFaces: File[] }[]
  >([{ cardTopic: "", cardFaces: [] }]);

  const form = useForm<yup.InferType<typeof contentCardsSchema>>({
    mode: "onSubmit",
    resolver: yupResolver(contentCardsSchema),
    defaultValues,
  });

  const { control, handleSubmit, setValue, watch } = form;

  const linkValue = watch("cards");

  function isContentCardsSectionData(sectionData: unknown): sectionData is {
    title: string;
    cards: { cardId: string; cardTopic: string; cardFaces: File[] }[];
  } {
    return (
      typeof sectionData === "object" &&
      sectionData !== null &&
      "title" in sectionData &&
      "cards" in sectionData &&
      Array.isArray((sectionData as { cards: unknown[] }).cards) &&
      (
        sectionData as {
          cards: { cardId: unknown; cardTopic: unknown; cardFaces: unknown[] }[];
        }
      ).cards.every(
        (card) =>
          typeof card === "object" &&
          card !== null &&
          "cardId" in card &&
          typeof (card as { cardId: unknown }).cardId === "string" &&
          "cardTopic" in card &&
          typeof (card as { cardTopic: unknown }).cardTopic === "string" &&
          "cardFaces" in card &&
          Array.isArray((card as { cardFaces: unknown[] }).cardFaces) &&
          (card as { cardFaces: unknown[] }).cardFaces.every(
            (face) => typeof face === "string"
          )
      )
    );
  }

  useEffect(() => {
    if (selectedSectionData && isContentCardsSectionData(selectedSectionData)) {
      const defaultTopics = selectedSectionData.cards.map((card) => ({
        cardId: card.cardId,
        cardTopic: card.cardTopic,
        cardFaces:
          card.cardFaces
            ?.map((face) => {
              if (typeof face === "string") {
                return normalizeLinkValue(face);
              }
              return face;
            })
            .flat() || [],
      }));

      setTopics(defaultTopics);
      setValue("title", selectedSectionData.title);
      setValue("cards", defaultTopics);
    } else {
      const defaultState = [{ cardTopic: "", cardFaces: [] }];
      setTopics(defaultState);
      setValue("title", "");
      setValue("cards", defaultState);
    }
  }, [selectedSectionData, setValue]);

  if (contentLoader) {
    return <ComponentLoader />;
  }

  const handleAddCardFace = (topicIndex: number) => {
    setTopics((prevTopics) => {
      const updatedTopics = [...prevTopics];
      updatedTopics[topicIndex] = {
        ...updatedTopics[topicIndex],
        cardFaces: [
          ...(updatedTopics[topicIndex].cardFaces || []),
          new File([], ""),
        ],
      };

      const currentCards = form.getValues("cards") || [];
      const updatedCards = currentCards.map((card, idx) =>
        idx === topicIndex
          ? {
              ...card,
              cardFaces: [...(card.cardFaces || []), new File([], "")],
            }
          : card
      );
      form.setValue("cards", updatedCards);

      return updatedTopics;
    });
  };

  const handleRemoveCardFace = (topicIndex: number, faceIndex: number) => {
    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.map((topic, idx) => {
        if (idx === topicIndex) {
          return {
            ...topic,
            cardFaces: topic.cardFaces.filter((_, i) => i !== faceIndex),
          };
        }
        return topic;
      });

      const currentCards = form.getValues("cards") || [];
      const updatedCards = currentCards.map((card, idx) =>
        idx === topicIndex
          ? {
              ...card,
              cardFaces: card.cardFaces.filter((_, i) => i !== faceIndex),
            }
          : card
      );
      form.setValue("cards", updatedCards);

      return updatedTopics;
    });
  };

  const handleAddTopic = () => {
    const newTopic = { cardTopic: "", cardFaces: [] };

    setTopics((prevTopics) => {
      const updatedTopics = [...prevTopics, newTopic];

      const currentCards = form.watch("cards") || [];
      form.setValue("cards", [...currentCards, newTopic]);

      return updatedTopics;
    });
  };

  const handleRemoveTopic = (topicIndex: number) => {
    setTopics((prevTopics) => {
      const newTopics = prevTopics.filter((_, idx) => idx !== topicIndex);

      const currentCards = form.watch("cards") || [];
      form.setValue(
        "cards",
        currentCards.filter((_, idx) => idx !== topicIndex)
      );

      return newTopics;
    });
  };

  const handleFileChange = (
    fileList: FileList | null,
    topicIndex: number,
    faceIndex: number
  ) => {
    if (fileList && fileList[0]) {
      const currentFaces =
        form.getValues(`cards.${topicIndex}.cardFaces`) || [];

      const updatedFaces = [...currentFaces];
      updatedFaces[faceIndex] = fileList[0];

      setValue(`cards.${topicIndex}.cardFaces`, updatedFaces, {
        shouldValidate: true,
      });
    }
  };

  return (
    <EditContentCardsField
      isLoading={isLoading}
      getValues={form.getValues}
      topics={topics}
      section={section}
      control={control}
      handleFileChange={handleFileChange}
      handleAddTopic={handleAddTopic}
      handleRemoveTopic={handleRemoveTopic}
      handleAddCardFace={handleAddCardFace}
      handleRemoveCardFace={handleRemoveCardFace}
      onSave={handleSubmit(onSubmit)}
    />
  );
};
