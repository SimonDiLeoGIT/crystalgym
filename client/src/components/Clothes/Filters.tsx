import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useEffect, useState } from "react";
import ClotheService from "../../services/clothe.service";
import { ClothesCategory } from "../../interfaces/ClothesInterfaces";
import { ErrorInterface } from "../../interfaces/ErrorInterface";
import SearchInput from "../Search/SearchInput";

interface props {
  id_category: string
  setData: (clothes: ClothesCategory) => void
}

const Filters: React.FC<props> = ({ id_category, setData }) => {

  const [gender, setGender] = useState<number>(3);
  const [text, setText] = useState<string>('');
  // const [sortBy, setSortBy] = useState<keyof ClotheDataInterface>('id');
  // const [sortOrder, setSortOrder] = useState<string>('asc');
  // const [perPage, _setPerPage] = useState<number>(10);

  useEffect(() => {
    getClothes();
  }, [gender, text]); // eslint-disable-line

  const getClothes = async (page?: number, perPage?: number, sortBy?: string, sortOrder?: string) => {
    try {
      const response = await ClotheService.getClothes(Number(id_category), gender, page, perPage, sortBy, sortOrder, text);
      if (response.code == 200) {
        setData(response.data);    
      }
    } catch (error: unknown) {
      const apiError = error as ErrorInterface<ClothesCategory>;
      if (apiError.code === 404 && apiError.data) {
        setData(apiError.data)
      }
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(Number((event.target as HTMLInputElement).value));
  };

  return (
    <FormControl>
      <div className="flex items-center">
        <div>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={gender}
            onChange={handleChange}
            >
            <FormControlLabel value={3} control={<Radio />} label="All" />
            <FormControlLabel value={2} control={<Radio />} label="Female" />
            <FormControlLabel value={1} control={<Radio />} label="Male" />
          </RadioGroup>
        </div>
        <SearchInput setText={setText} />
      </div>
    </FormControl>
  )
}

export default Filters