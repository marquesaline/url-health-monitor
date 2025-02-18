FactoryBot.define do
  factory :check do
    site_monitor { nil }
    status_code { 1 }
    response_time { 1 }
    checked_at { "2025-02-18 21:08:31" }
    success { false }
  end
end
