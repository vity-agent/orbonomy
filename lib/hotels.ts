const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const BOOKING_HOST = "booking-com15.p.rapidapi.com";

export async function searchHotels(params: {
  location: string;
  checkin?: string;
  checkout?: string;
  adults?: number;
  budget?: string;
  limit?: number;
}) {
  if (!RAPIDAPI_KEY || RAPIDAPI_KEY.startsWith("your-")) {
    return { results: [], source: "no-api-key" };
  }

  const url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels";
  const queryParams = new URLSearchParams({
    dest_id: params.location,
    search_type: "CITY",
    arrival_date: params.checkin || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    departure_date: params.checkout || new Date(Date.now() + 10 * 86400000).toISOString().split("T")[0],
    adults: String(params.adults || 2),
    room_qty: "1",
    currency_code: "USD",
    sort_by: "popularity",
    units: "metric",
  });

  const res = await fetch(`${url}?${queryParams}`, {
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": BOOKING_HOST,
    },
  });

  if (!res.ok) return { results: [], source: "api-error", status: res.status };

  const data = await res.json();
  const hotels = ((data.data?.hotels || []) as Record<string, unknown>[]).map((h: Record<string, unknown>) => {
    const prop = (h.property || {}) as Record<string, unknown>;
    const price = ((prop.priceBreakdown || {}) as Record<string, unknown>).grossPrice as Record<string, unknown> | undefined;
    const loc = (prop.location || {}) as Record<string, unknown>;
    return {
      id: h.hotel_id || prop.id,
      name: prop.name || "",
      address: (loc.address as string) || "",
      city: (loc.city as string) || "",
      country: (loc.country as string) || "",
      price_per_night: price?.value || null,
      currency: (price?.currency as string) || "USD",
      rating: prop.reviewScore || null,
      review_count: prop.reviewCount || 0,
      images: prop.photoUrls || [],
      url: prop.url || "",
      source: "Booking.com",
    };
  });

  return { results: hotels.slice(0, params.limit || 20), total: hotels.length, source: "booking.com" };
}

export async function getHotelDetails(hotelId: string) {
  if (!RAPIDAPI_KEY || RAPIDAPI_KEY.startsWith("your-")) return null;

  const url = "https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails";
  const res = await fetch(`${url}?hotel_id=${hotelId}&currency_code=USD`, {
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": BOOKING_HOST,
    },
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.data || null;
}
