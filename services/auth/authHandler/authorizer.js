import JWT from "jsonwebtoken";

const key = process.env.key;

export const main = async (event) => {
  try {
    console.log(process.env);
    if (!event.headers.Authorization) {
      throw "Unauthorised";
    } else {
      // let token = event.authorizationToken.includes('Bearer') ?event.authorizationToken.split(' ')[1]:event.authorizationToken;
      let token = event.headers.Authorization;
      let decode = JWT.verify(token, key);
      console.log(decode);

      return {
        principalId: decode.emailId,
        policyDocument: generatePolicy("Allow", "execute-api:Invoke", "*"),
        context: {
          emailId: decode.emailId,
          userId: decode.userId,
          role: decode.role,
          schoolId: decode.schoolId,
        },
      };
    }
  } catch (err) {
    return {
      principalId: "12345",
      policyDocument: generatePolicy("Deny", "execute-api:Invoke", "*"),
    };
  }
};
const generatePolicy = (effect, action, resource) => {
  let policy = {};
  policy.Version = "2012-10-17";
  policy.Statement = [];
  let statementObject = {};
  statementObject.Effect = effect;
  statementObject.Action = action;
  statementObject.Resource = resource;
  policy.Statement.push(statementObject);
  return policy;
};
