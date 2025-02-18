ARG RUBY_VERSION=3.2.2
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim as base

RUN useradd -m -s /bin/bash rails

WORKDIR /rails

ENV RAILS_ENV="production" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

RUN mkdir -p /usr/local/bundle && \
    chown -R rails:rails /usr/local/bundle /rails

FROM base as build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev pkg-config

USER rails

COPY --chown=rails:rails Gemfile Gemfile.lock ./

RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

COPY --chown=rails:rails . .

RUN bundle exec bootsnap precompile app/ lib/

FROM base

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl postgresql-client && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

COPY --from=build /usr/local/bundle /usr/local/bundle
COPY --from=build /rails /rails


RUN chown -R rails:rails /usr/local/bundle /rails /rails/tmp /rails/log /rails/db

USER rails

EXPOSE 3000

CMD ["./bin/rails", "server"]
