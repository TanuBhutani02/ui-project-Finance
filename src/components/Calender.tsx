interface CalendarProps {
    selected?: Date;
    onChange: (date: Date | undefined) => void;
  }
  
  export function Calendar({ selected, onChange }: CalendarProps) {
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newDate = event.target.value ? new Date(event.target.value) : undefined;
      onChange(newDate);
    };
  
    return (
      <input
        type="date"
        value={selected ? selected.toISOString().split("T")[0] : ""}
        onChange={handleDateChange}
        className="border p-2 rounded w-full"
      />
    );
  }
  