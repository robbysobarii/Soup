import { Alert, Box, Button, Modal, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import { Section } from "components/Section";
import { CheckoutContext, LoginContext } from "contexts";
import { useAsync } from "hooks/useAsync";
import { ReactComponent as CheckedBoxIcon } from "icons/checked-box.svg";
import { ReactComponent as UncheckedBoxIcon } from "icons/unchecked-box.svg";
import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiUrl } from "utils/getApiUrl";
import { getAuthorizedOptions } from "utils/getAuthorizedOptions";
import { getFormattedPrice } from "utils/getFormattedPrice";
import { MenuList } from "./components/MenuList";
import { ModalContent } from "./components/ModalContent";
import styles from "./style.module.css";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const API_ENDPOINT = `${getApiUrl()}/checkout/get`;

function getDataAsync() {
  return axios.get(API_ENDPOINT, getAuthorizedOptions());
}

export const Checkout = () => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const { getCheckoutCount } = useContext(CheckoutContext);
  const { setLoggedIn } = useContext(LoginContext);
  const { value, status, execute, error } = useAsync(getDataAsync, false);
  const [open, setOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const checkoutList = useMemo(() => {
    if (status === "idle") {
      execute();
    }
    if (status === "success") {
      return value.data;
    }
    if (status === "error") {
      console.log(error);
      setLoggedIn(false);
    }
    return [];
  }, [value, status, execute]);

  const handleCheckAll = () => {
    const newCheckedItems = {};
    let newTotalPrice = 0;
    checkoutList.forEach((item) => {
      newCheckedItems[item.id] = !selectAll;
      newTotalPrice += item.price;
    });
    setCheckedItems(newCheckedItems);
    setSelectAll(!selectAll);
    setTotalPrice(!selectAll ? newTotalPrice : 0);
  };

  const handleCheck = (itemId, itemPrice) => {
    setCheckedItems({
      ...checkedItems,
      [itemId]: !checkedItems[itemId],
    });
    setSelectAll(false);
    setTotalPrice(
      checkedItems[itemId] ? totalPrice - itemPrice : totalPrice + itemPrice
    );
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${getApiUrl()}/checkout/delete?id=${id}`, getAuthorizedOptions())
      .then((res) => {
        getCheckoutCount();
        execute();
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  };

  const handlePayment = async () => {
    const data = {
      total_price: totalPrice,
      checked_course: checkoutList
        .filter((item) => checkedItems[item.id])
        .map((item) => {
          return {
            checkout_id: item.id,
            fk_course_id: item.course_id,
            schedule: item.schedule,
          };
        }),
    };
    console.log(data);
    await axios
      .post(`${getApiUrl()}/invoice/add`, data, getAuthorizedOptions())
      .then((res) => {
        getCheckoutCount();
        execute();
        navigate("/success-purchase");
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  };

  return checkoutList.length ? (
    <Section className={styles.section}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          severity={"error"}
          sx={{ width: "100%" }}
        >
          Please select at least one course!
        </Alert>
      </Snackbar>
      <Box className={styles.content}>
        <Box className={styles.selectAll}>
          <button
            className={selectAll ? styles.checked : styles.unchecked}
            onClick={handleCheckAll}
          >
            {selectAll ? <CheckedBoxIcon /> : <UncheckedBoxIcon />}
          </button>
          <Typography variant="h6" color="primary" fontWeight={400}>
            Pilih Semua
          </Typography>
        </Box>
        <Box className={styles.list}>
          {status === "success" &&
            checkoutList.map((item) => (
              <MenuList
                onCheck={() => handleCheck(item.id, item.price)}
                isChecked={checkedItems[item.id]}
                key={item.id}
                data={item}
                handleDelete={() => handleDelete(item.id)}
              />
            ))}
        </Box>
      </Box>
      <Box className={styles.bottomBox}>
        <Box className={styles.bottomContent}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Typography
              variant="subtitle2"
              style={{ color: "gray" }}
              fontSize={"18px"}
            >
              Total Price
            </Typography>
            <Typography variant="h5" color="secondary">
              IDR {getFormattedPrice(totalPrice)}
            </Typography>
          </div>
          <Button
            onClick={() => {
              if (totalPrice === 0) {
                setSnackbarOpen(true);
                return;
              }
              setOpen(true);
            }}
            variant="contained"
            color="secondary"
          >
            Pay Now
          </Button>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalContent
          onCancel={() => setOpen(false)}
          onSubmit={handlePayment}
        />
      </Modal>
    </Section>
  ) : (
    <Section>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
          gap: "20px",
        }}
      >
        <ProductionQuantityLimitsIcon
          color="primary"
          style={{ fontSize: "20vh" }}
        />
        <Typography variant="h2" color="primary" style={{ fontSize: "5vh" }}>
          Your cart is empty
        </Typography>
        <Typography
          variant="subtitle2"
          color="primary"
          paddingX={10}
          align="center"
        >
          Looks like you have not added anything to your cart.
        </Typography>
      </Box>
    </Section>
  );
};
