FactoryBot.define do
  factory :site_monitor do
    name { 'Meu Monitor' }
    url { 'https://google.com' }
    check_interval { 5 }
    status { :up }
    last_checked_at { Time.current }
    user_id { 1 }
  end
end