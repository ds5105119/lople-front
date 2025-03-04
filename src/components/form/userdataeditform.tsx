import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ToggleButtonProps {
  text: string;
  initialValue: boolean;
  onChange: (callback: (prevState: boolean) => boolean) => void;
}

const ToggleButton = ({ text, initialValue, onChange }: ToggleButtonProps) => {
  const [toggle, setToggle] = useState<boolean>(initialValue);

  const handleOnClick = () => {
    setToggle((prev) => !prev);
    onChange((prev) => !prev);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleOnClick}>
      {text}
    </Button>
  );
};

export default function UserDataEditForm() {
  const multicultural = useState(false);
  const north_korean = useState(false);
  const single_parent_or_grandparent = useState(false);
  const homeless = useState(false);
  const new_resident = useState(false);
  const multi_child_family = useState(false);
  const extend_family = useState(false);
  const disable = useState(false);
  const veteran = useState(false);
  const [disease, setDisease] = useState(false);
}
