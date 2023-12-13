FROM openjdk:17-slim AS build

WORKDIR /app

COPY . .

RUN ./mvnw clean package

FROM openjdk:17-slim

WORKDIR /app

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "backend.jar"]