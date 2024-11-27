import {
  CalendarToday,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { Box, InputAdornment, Popover, styled, TextField } from "@mui/material";
import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { FilterProps } from "react-table";
import { formatDate, isValidDate } from "../../../core";

type DateRange = [Date | null, Date | null];

export const DateRangeColumnFilter: React.FC<FilterProps<{}>> = ({
  onChange,
  column: { id },
  labelPrefix = "",
  filterValue = [null, null],
}) => {
  const [value, setValue] = useState<DateRange>(filterValue);
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);

  return (
    <>
      <Popover
        id={`${id}-filter`}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        data-testid="calendar-popover"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Box width={650} p={4}>
          <CustomCalendar
            selectRange
            calendarType="US"
            maxDetail="month"
            minDetail="month"
            onChange={handleChange}
            value={value}
            showDoubleView
            defaultView="month"
            returnValue="range"
            showNeighboringMonth={false}
            nextLabel={<KeyboardArrowRight />}
            next2Label={<KeyboardDoubleArrowRight />}
            nextAriaLabel={"next-month"}
            next2AriaLabel={"next-year"}
            prevLabel={<KeyboardArrowLeft />}
            prev2Label={<KeyboardDoubleArrowLeft />}
            prevAriaLabel={"previous-month"}
            prev2AriaLabel={"previous-year"}
          />
        </Box>
      </Popover>

      <TextField
        label=""
        aria-describedby={`${id}-filter`}
        sx={{ width: "100%" }}
        value={formatValue(value)}
        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
          handleInputClick(e.currentTarget)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
          e.code === "Enter" && handleInputClick(e.currentTarget)
        }
        inputProps={{ placeholder: "Select Date Range" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CalendarToday
                sx={{ color: (theme) => theme.palette.common.black }}
              />
            </InputAdornment>
          ),
        }}
      />
    </>
  );

  function handleChange(newValue: [Date] | DateRange) {
    setValue([
      isValidDate(newValue[0] as Date) ? newValue[0] : null,
      newValue[1] && isValidDate(newValue[1] as Date) ? newValue[1] : null,
    ]);
    if (isValidDate(newValue[0] as Date) && isValidDate(newValue[1] as Date)) {
      onChange({ id, value: [newValue[0], newValue[1]] });
      setAnchorEl(null);
    }
  }

  function handleClose() {
    if (isValidDate(value[0] as Date) && isValidDate(value[1] as Date)) {
      onChange({ id, value });
    }

    if (!value[0] && !value[1]) {
      onChange({ id, value: null });
    }

    setAnchorEl(null);
  }

  function handleInputClick(target: HTMLInputElement) {
    setValue([null, null]);
    setAnchorEl(target);
  }
};

const formatValue = (value: DateRange) =>
  value[0] || value[1]
    ? `${value[0] ? formatDate(value[0]) : ""} - ${value[1] ? formatDate(value[1]) : ""}`
    : "";

const CustomCalendar = styled((props: CalendarProps) => (
  <Calendar {...props} />
))(({ theme }) => ({
  ".react-calendar__navigation": {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    padding: theme.spacing(2),

    ".react-calendar__navigation__label": {
      padding: 8,
      border: 0,
      backgroundColor: "transparent",
      color: theme.palette.text.primary,
      fontSize: theme.typography.body1.fontSize,
    },

    ".react-calendar__navigation__arrow": {
      height: 32,
      width: 32,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      boxSizing: "border-box",
      backgroundColor: "transparent",
      outline: 0,
      border: 0,
      margin: "2px 0px 0px 0px",
      cursor: "pointer",
      userSelect: "none",
      verticalAlign: "middle",
      textDecoration: "none",
      textAlign: "center",
      flex: "0 0 auto",
      borderRadius: "50%",
      overflow: "visible",
      color: theme.palette.text.primary,
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      padding: 8,
      fontSize: "1.5rem",

      ":hover": {
        backgroundColor: theme.palette.appColors.support80.transparentLight,
      },
    },
  },

  ".react-calendar__viewContainer": {
    display: "flex",
    gap: theme.spacing(8),
    padding: theme.spacing(2),

    ".react-calendar__month-view__weekdays__weekday": {
      height: 40,
      width: 40,
      alignItems: "center",
      textAlign: "center",
      color: theme.palette.primary.main,
      fontSize: 0,

      abbr: {
        textDecoration: "none",
      },

      ":first-letter": {
        fontSize: theme.typography.body1.fontSize,
      },
    },

    ".react-calendar__month-view__days__day": {
      height: 40,
      width: 40,
      border: 0,
      borderRadius: "50%",
      backgroundColor: "transparent",
      fontSize: theme.typography.body1.fontSize,
      cursor: "pointer",

      ":hover:not(.react-calendar__tile--range)": {
        border: `1px solid ${theme.palette.appColors.support80.transparentDark}`,
        backgroundColor: theme.palette.appColors.support80.transparentLight,
      },

      ":focus": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: "50%",
      },
    },

    ".react-calendar__tile--now": {
      border: `1px solid ${theme.palette.primary.main}`,
    },

    ".react-calendar__month-view__days__day--neighboringMonth": {
      visibility: "hidden",
    },

    ".react-calendar__tile--range": {
      backgroundColor: theme.palette.appColors.support80.transparentLight,
      border: `2px dashed ${theme.palette.appColors.support80.transparentDark}`,
      borderLeft: "none",
      borderRight: "none",
      borderRadius: 0,

      ":hover:not(:focus)": {
        backgroundColor: theme.palette.appColors.support80.light,
      },
    },

    ".react-calendar__tile--rangeStart": {
      borderLeft: `2px dashed ${theme.palette.appColors.support80.transparentDark}`,
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    },

    ".react-calendar__tile--rangeEnd": {
      borderRight: `2px dashed ${theme.palette.appColors.support80.transparentDark}`,
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%",
    },
  },
}));
