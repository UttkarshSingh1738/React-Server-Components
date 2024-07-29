import "./styles/App.css";
import GlobalSideNavComponent from "./GlobalSideNavComponent.tsx";
import Home from "./Home";
import RefundCards from "./RefundCards";
import RoutingDelayView from "./RoutingDelayView.tsx"
import RefundTransactionHome from './RefundTransactionHome.tsx';
import RefundTransactionById from './RefundTransactionById.tsx';
import ManualRefundHome from './ManualRefundHome.tsx';
import ManualRefundById from './ManualRefundById.tsx';
export default async function Page() {
  return (
    <>
      <div className="row me-1 app-container">
        <div className="col-lg-2">
          <GlobalSideNavComponent />
        </div>
        <div className="col-lg-10 mt-3">
          <Home />
          <RefundCards />
          <RoutingDelayView />
          <ManualRefundHome />
          <ManualRefundById />
          <RefundTransactionHome />
          <RefundTransactionById />
        </div>
      </div>
    </>
  );
}