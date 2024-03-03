import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { SalaryCalculatorPage } from "./pages/SalaryCalculator";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route
          path="/salary-calculator"
          exact
          component={SalaryCalculatorPage}
        />
      </Switch>
    </BrowserRouter>
  );
}
