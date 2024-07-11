import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
    const navigate = useNavigate();
    const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGuestsModalOpen, setIsModalInputOpen] = useState(false);
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

    const [destination, setDestination] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [ownerEmail, setownerEmail] = useState('');
    const [eventRangeDates, setEventRangeDates] = useState<DateRange | undefined>();
    const [emailsToInvite, setEmailsToInvite] = useState(["rubenskishimoto@gmail.com"]);

    function openGuestsInput() {
        setIsGuestsInputOpen(true)
    }

    function closeGuestsInput() {
        setIsGuestsInputOpen(false)
    }

    function openGuestsModal() {
        setIsModalInputOpen(true)
    }

    function closeGuestsModal() {
        setIsModalInputOpen(false)
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true)
    }

    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false)
    }

    function removeEmailFromInvites(emailToRemove: string) {
        const newEmailsList = emailsToInvite.filter(email => email !== emailToRemove)

        setEmailsToInvite(newEmailsList);
    }

    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get("email")?.toString()

        if (!email) {
            return
        }

        if (emailsToInvite.includes(email)) {
            return
        }

        setEmailsToInvite([
            ...emailsToInvite,
            email
        ])

        event.currentTarget.reset()
    }

    async function createTrip(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!destination || !ownerName || !ownerEmail || !eventRangeDates?.from || !eventRangeDates?.to || emailsToInvite.length === 0) {
            return
        }

        setIsLoading(true)

        try {
            const response = await api.post('/trips', {
                destination,
                starts_at: eventRangeDates.from,
                ends_at: eventRangeDates.to,
                emails_to_invite: emailsToInvite,
                owner_name: ownerName,
                owner_email: ownerEmail,
            })

            const { tripId } = response.data

            navigate(`/trips/${tripId}`)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">

                <div className="flex flex-col items-center gap-3">
                    <img src="/logo.svg" alt="plann.er" />
                    <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
                </div>

                <DestinationAndDateStep
                    isGuestsInputOpen={isGuestsInputOpen}
                    closeGuestsInput={closeGuestsInput}
                    openGuestsInput={openGuestsInput}
                    setDestination={setDestination}
                    setEventRangeDates={setEventRangeDates}
                    eventRangeDates={eventRangeDates}
                />

                {isGuestsInputOpen && (
                    <InviteGuestsStep
                        emailsToInvite={emailsToInvite}
                        openGuestsModal={openGuestsModal}
                        openConfirmTripModal={openConfirmTripModal}
                    />
                )}

                <p className="text-sm text-zinc-500">
                    Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade.</a>
                </p>
            </div>

            {isGuestsModalOpen && (
                <InviteGuestsModal
                    closeGuestsModal={closeGuestsModal}
                    emailsToInvite={emailsToInvite}
                    removeEmailFromInvites={removeEmailFromInvites}
                    addNewEmailToInvite={addNewEmailToInvite}
                />
            )}

            {isConfirmTripModalOpen && <ConfirmTripModal isLoading={isLoading} setOwnerName={setOwnerName} setOwnerEmail={setownerEmail} closeConfirmTripModal={closeConfirmTripModal} createTrip={createTrip} />}
        </div >
    )
}
