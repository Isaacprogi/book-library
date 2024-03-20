
const addMin = async (req, res, next) => {
    const { fullName, email, password, confirmPassword, avatar,course } = req.body;

    if (!email || !password || !fullName || !confirmPassword || !avatar || !course) {
        return next({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return next({ message: "Passwords don't match" });
    }

    try {
        const existEmail = await User.findOne({ email });
        if (existEmail) return next({ message: 'An account with this email exists' });

        const user = new User({ fullName, email, password, avatar,course });

        await user.save();

        const accessToken = createAccessToken(user.id);
        const refreshToken = createRefreshToken(user.id);

        await user.updateOne({ refreshtoken: refreshToken });

        sendRefreshToken(res, refreshToken);
        const { password: userPassword, refreshtoken, __v, ...others } = user._doc;

        sendAccessToken(res, accessToken, others);
    } catch (error) {
        console.error(error);
        next({ message: 'Internal Server error' });
    }
};



module.exports = {
    login,
    register,
    logout,
    refreshToken,
};
