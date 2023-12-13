FROM openjdk:17-slim AS build

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

FROM openjdk:17-slim

WORKDIR /app

COPY --from=build /app/target/socket-0.0.1-SNAPSHOT.jar /app/backend.jar

EXPOSE 5000

ENTRYPOINT ["java", "-jar", "backend.jar"]