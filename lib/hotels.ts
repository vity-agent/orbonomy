const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";

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

  const url = "https://booking-com.p.rapidapi.com/v1/hotels/search";
  const queryParams = new URLSearchParams({
    dest_type: "city",
    adults_number: String(params.adults || 2),
    checkin_date: params.checkin || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    checkout_date: params.checkout || new Date(Date.now() + 10 * 86400000).toISOString().split("T")[0],
    order_by: "popularity",
    filter_by_currency: "USD",
    dest_id: params.location,
    locale: "en-us",
    units: "metric",
    room_number: "1",
    page_number: "0",
    include_adjacency: "true",
  });

  const res = await fetch(`${url}?${queryParams}`, {
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  });

  if (!res.ok) return { results: [], source: "api-error", status: res.status };

  const data = await res.json();
  const hotels = (data.result || []).map((h: Record<string, unknown>) => ({
    id: h.hotel_id,
    name: h.hotel_name,
    address: h.address,
    city: h.city,
    country: h.country_trans,
    price_per_night: h.min_total_price,
    currency: h.currencycode,
    rating: h.review_score,
    review_count: h.review_nr,
    images: h.max_photo_url ? [h.max_photo_url] : [],
    url: h.url,
    source: "Booking.com",
  }));

  return { results: hotels.slice(0, params.limit || 20), total: hotels.length, source: "booking.com" };
}

export async function getHotelDetails(hotelId: string) {
  if (!RAPIDAPI_KEY || RAPIDAPI_KEY.startsWith("your-")) return null;

  const url = `https://booking-com.p.rapidapi.com/v1/hotels/data`;
  const res = await fetch(`${url}?hotel_id=${hotelId}&locale=en-us`, {
    headers: {
      "X-RapidAPI-Key": RAPIDAPI_KEY,
      "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
    },
  });

  if (!res.ok) return null;
  return res.json();
}
