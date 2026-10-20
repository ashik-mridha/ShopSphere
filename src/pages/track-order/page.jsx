
import useTrackOrder from "../../hooks/useTrackOrder";
import TrackOrderLoading from '../../Components/track-order-cpmp/TrackOrderLoading'
import TrackOrderError from "../../Components/track-order-cpmp/TrackOrderError";
import TrackOrderHeader from "../../Components/track-order-cpmp/TrackOrderHeader";
import OrderProgress from "../../Components/track-order-cpmp/OrderProgress";
import TrackingTimeline from "../../Components/track-order-cpmp/TrackingTimeline";
import OrderSummary from "../../Components/track-order-cpmp/OrderSummary";

import { getStepIndex } from "../../utils/orderTracking";
import { useParams } from "react-router-dom";

export default function TrackOrderPage() {
    const { id } = useParams();
    const { order, loading, error } = useTrackOrder();

    if (loading) {
        return <TrackOrderLoading />;
    }

    if (error || !order) {
        return (
            <TrackOrderError
                message={error || "We couldn't find this order."}
            />
        );
    }

    const status = order.status || "Pending";
    const currentStep = getStepIndex(status);
    const cancelled = currentStep === -1;

    return (
        <main className="min-h-screen bg-white px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <TrackOrderHeader
                    order={order}
                    id={id}
                    status={status}
                    currentStep={currentStep}
                    cancelled={cancelled}
                />

                <OrderProgress
                    currentStep={currentStep}
                    cancelled={cancelled}
                />

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
                    <TrackingTimeline
                        order={order}
                        currentStep={currentStep}
                    />

                    <OrderSummary order={order} />
                </div>
            </div>
        </main>
    );
}
