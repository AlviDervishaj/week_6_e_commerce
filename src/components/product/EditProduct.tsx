import { set, useForm } from "react-hook-form";
import { ProductType } from "../../types/product";
import TextField from "@mui/material/TextField/TextField";
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/material/Box/Box';
import { Item } from "../ui/Item";
import { TextareaAutosize } from '../ui/TextareaAutosize';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../providers/ProductsContext";
import { CircularProgress, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";

type InputType = {
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const EditProduct = ({ product }: { product: ProductType | undefined }) => {
  const { updateProduct, createProduct } = useContext(ProductsContext);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<InputType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
      });
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [product, reset]);

  const handleFormSubmit = (data: InputType) => {
    if (product) {
      updateProduct({ ...product, ...data });
      setMessage("Product saved successfully !");
      setTimeout(() => navigate("/"), 2000);
    }
    else {
      const _productId = Math.floor(Math.random() * 1000)
      const _newProduct: ProductType = {
        id: _productId,
        ...data,
        rating: { rate: 0, count: 0 }
      }
      createProduct(_newProduct);
      setMessage("Product created successfully !");
      setTimeout(() => navigate(`/product/${_productId}`), 2000);
    }
  }

  if (isLoading) {
    return <Box display="grid" sx={{ width: 1, height: '90dvh', placeItems: "center" }}>
      <CircularProgress />
    </Box>
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Item
          sx={{
            paddingY: 1,
            height: 1,
            width: 1,
            shadow: 2,
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
          }}
          useFlexGap
          direction="column"
          spacing={2}
        >
          {product &&
            <Box
              sx={{ width: 1, height: "auto", marginX: "auto", paddingBottom: 10 }}
            >
              <img src={product.image} alt={product.title} width={250} height={250} style={{ aspectRatio: "square", objectFit: "contain" }} />
            </Box>
          }
          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <TextField placeholder="Product Title" sx={{ width: 1 }} {...register("title", { required: "Do not leave title field empty !" })} />
            {errors.title && <Typography color="error">{errors.title.message}</Typography>}
          </Box>
          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <TextField placeholder="Product Image URL" sx={{ width: 1 }} {...register("image", { required: "Do not leave image field empty !" })} />
            {errors.image && <Typography color="error">{errors.image.message}</Typography>}
            <FormHelperText>Provide just the url please.</FormHelperText>
          </Box>
          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <TextareaAutosize placeholder="Product Description" {...register("description", { required: "Do not leave description field empty !" })} />
            {errors.description && <Typography color="error">{errors.description.message}</Typography>}
          </Box>

          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <TextField placeholder="Product Category"{...register("category", { required: "Do not leave category field empty !" })} />
            {errors.category && <Typography color="error">{errors.category.message}</Typography>}
          </Box>
          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <TextField placeholder="Product Price" type={"number"} {...register("price", { required: "Do not leave price field empty !" })} />
            {errors.price && <Typography color="error">{errors.price.message}</Typography>}
          </Box>
          <Box sx={{ width: 0.5, marginX: "auto" }}>
            <Typography color="success">{message}</Typography>
          </Box>
          <LoadingButton
            loading={isSubmitting}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            type="submit"
            variant="outlined" sx={{ marginLeft: 3 }}>Save</LoadingButton>

        </Item>
      </form>
    </div>
  )
}
