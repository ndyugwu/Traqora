#![no_std]
use contract_events::{Action, Domain};
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};

#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum BookingState {
    Pending,
    Confirmed,
    Cancelled,
    Refunded,
}

#[contracttype]
#[derive(Clone)]
pub struct Booking {
    pub booking_id: u64,
    pub passenger: Address,
    pub flight_id: Symbol,
    pub seat: Symbol,
    pub amount: i128,
    pub escrowed_amount: i128,
    pub state: BookingState,
    pub created_at: u64,
}

#[contracttype]
#[derive(Clone)]
enum DataKey {
    NextId,
    Booking(u64),
}

#[contract]
pub struct FlightBookingContract;

#[contractimpl]
impl FlightBookingContract {
    pub fn review_terms(env: Env, flight_id: Symbol) -> (Symbol, Symbol) {
        // Returns applicable (fare_terms, cancellation_terms) before payment authorization
        assert!(flight_id != Symbol::new(&env, "INVALID"), "Invalid flight for terms review");
        (symbol_short!("non_ref"), symbol_short!("strict"))
    }

    pub fn reserve_seat(
        env: Env,
        passenger: Address,
        flight_id: Symbol,
        seat: Symbol,
        amount: i128,
    ) -> u64 {
        passenger.require_auth();
        assert!(amount > 0, "Invalid amount");
        let (_fare_terms, _cancellation_terms) = Self::review_terms(env.clone(), flight_id.clone());

        let seat_key = (symbol_short!("seat"), flight_id.clone(), seat.clone());
        if env.storage().persistent().has(&seat_key) {
            panic!("Seat already reserved");
        }

        let booking_id: u64 = env.storage().instance().get(&DataKey::NextId).unwrap_or(1);
        let created_at = env.ledger().timestamp();

        let booking = Booking {
            booking_id,
            passenger: passenger.clone(),
            flight_id: flight_id.clone(),
            seat: seat.clone(),
            amount,
            escrowed_amount: amount,
            state: BookingState::Confirmed,
            created_at,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Booking(booking_id), &booking);
        env.storage().persistent().set(&seat_key, &booking_id);
        env.storage()
            .instance()
            .set(&DataKey::NextId, &(booking_id + 1));

        contract_events::emit(
            &env,
            Domain::Seat,
            Action::Reserved,
            (
                passenger.clone(),
                created_at,
                booking_id,
                flight_id,
                seat,
                amount,
            ),
        );

        booking_id
    }

    pub fn get_booking(env: Env, booking_id: u64) -> Option<Booking> {
        env.storage()
            .persistent()
            .get(&DataKey::Booking(booking_id))
    }

    pub fn init_upgrade_owner(env: Env, owner: Address) {
        access::UpgradeTimelock::init_upgrade_owner(&env, &owner);
    }
}
