import { Container } from "@shared/layout/container";
import { useTranslation } from "react-i18next";
import { SignupForm } from "../components/signupForm";

export const SignupPage = () => {
  const { t } = useTranslation("auth")
  return (
    <>
      <Container bg="lightblue">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Container>
      <Container>
        <h1 className="mb-8">{t("createUser")}</h1>
        <SignupForm />
      </Container>
    </>
  );
};
