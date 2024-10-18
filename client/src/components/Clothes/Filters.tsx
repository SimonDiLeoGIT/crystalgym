import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useEffect, useState } from "react";
import ClotheService from "../../services/clothe.service";
import { ClothesCategory } from "../../interfaces/ClothesInterfaces";
import { ErrorInterface } from "../../interfaces/ErrorInterface";

interface props {
  id_category: string
  setData: (clothes: ClothesCategory) => void
}

const Filters: React.FC<props> = ({ id_category, setData }) => {

  const [gender, setGender] = useState<number>(3);

  // const [name, setName] = useState<string>('');
  // const [sortBy, setSortBy] = useState<keyof ClotheDataInterface>('id');
  // const [sortOrder, setSortOrder] = useState<string>('asc');
  // const [perPage, _setPerPage] = useState<number>(10);

  useEffect(() => {
    getClothes(gender);
  }, [gender]); // eslint-disable-line

  const getClothes = async (id_gender?: number, page?: number, perPage?: number, sortBy?: string, sortOrder?: string, name?: string) => {
    try {
      const response = await ClotheService.getClothes(Number(id_category), id_gender, page, perPage, sortBy, sortOrder, name);
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
    </FormControl>
  )
}

export default Filters