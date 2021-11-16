const URL = `https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-1-jvnaq/service/xdai_burn_query/incoming_webhook/get_burn_starts_prev_week`

const lastWeedBurned = async() => {

    const getData = await fetch(URL);
    const response = await getData.json();
    console.log(response)

    return response
}

export default lastWeedBurned;
