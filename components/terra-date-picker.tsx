"use client";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import { NormalizedEPICItem } from "@/lib/types";
import { format, parse, isValid } from "date-fns";

const DISPLAY_FORMAT = "dd/MM/yyyy";
const API_FORMAT = "yyyy-MM-dd";

const TerraDatePicker = ({
  data,
  setSelectedDate,
}: {
  data: NormalizedEPICItem[] | undefined;
  setSelectedDate: (date: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date | undefined>(new Date());
  const [value, setValue] = useState("");

  // Initialize date from API data
  useEffect(() => {
    if (data && data.length > 0) {
      const timestamp = data[0].timestamp; // like this -> "2015-06-13 00:12:17"
      const parsedDate = new Date(timestamp.replace(" ", "T"));
      if (isValid(parsedDate)) {
        setDate(parsedDate);
        setMonth(parsedDate);
        setValue(format(parsedDate, DISPLAY_FORMAT));
      }
    }
  }, [data]);

  // Handle manual date input
  const handleDateInputChange = (inputValue: string) => {
    setValue(inputValue);
    const parsed = parse(inputValue, DISPLAY_FORMAT, new Date());
    if (isValid(parsed)) {
      setDate(parsed);
      setMonth(parsed);
      setSelectedDate(format(parsed, API_FORMAT));
    }
  };

  // Handle date picked from calendar
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    setMonth(selectedDate);
    setOpen(false);

    const display = format(selectedDate, DISPLAY_FORMAT);
    const api = format(selectedDate, API_FORMAT);

    setValue(display);
    setSelectedDate(api);
  };

  return (
    <div className="relative flex gap-2 flex-[2]">
      <Input
        id="date"
        value={value}
        placeholder="Select a date"
        className="bg-black/40 border-white/20 text-white backdrop-blur-md pr-10 w-full"
        onChange={(e) => handleDateInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker"
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <CalendarIcon className="size-3.5" />
            <span className="sr-only">Select date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={handleDateSelect}
            disabled={(date) =>
              date > new Date() || date < new Date(2015, 6, 13)
            }
            classNames={{
              day_button:
                "[&[data-selected-single=true]]:bg-black/80 [&[data-selected-single=true]]:text-white [&[data-selected-single=true]]:hover:bg-black/70 [&[data-selected-single=true]]:hover:text-white",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TerraDatePicker;
