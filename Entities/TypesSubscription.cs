namespace conversor_coin;

public enum TypesSubscription
{
    Free,
    Basic,
    Premium
}

static class TypesExtensions
{
    public static String ToFriendlyString(this TypesSubscription types)
    {
        switch (types)
        {
            case TypesSubscription.Free:
                return "Free";
            case TypesSubscription.Basic:
                return "Basic";
            case TypesSubscription.Premium:
                return "Premium";
            default:
                return "Unknown";
        }
    }

    public static TypesSubscription fromInt(int value)
    {
        switch (value)
        {
            case 0:
                return TypesSubscription.Free;
            case 1:
                return TypesSubscription.Basic;
            case 2:
                return TypesSubscription.Premium;
            default:
                return TypesSubscription.Free;  
        }
    }

    public static int limitRequests(this TypesSubscription types)
    {
        switch (types)
        {
            case TypesSubscription.Free:
                return 50;
            case TypesSubscription.Basic:
                return 100;
            case TypesSubscription.Premium:
                return 1000;
            default:
                return 50;
        }
    }
    
    public static int toInt(this TypesSubscription types)
    {
        switch (types)
        {
            case TypesSubscription.Free:
                return 0;
            case TypesSubscription.Basic:
                return 1;
            case TypesSubscription.Premium:
                return 2;
            default:
                return 0;
        }
    }
}