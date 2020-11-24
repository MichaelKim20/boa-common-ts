/*******************************************************************************

    Test that validation with JSON schema

    Copyright:
        Copyright (c) 2020 BOS Platform Foundation Korea
        All rights reserved.

    License:
        MIT License. See LICENSE for details.

*******************************************************************************/

import * as common from '../lib';

import * as assert from 'assert';

describe ('Test that validation with JSON schema', () =>
{
    it ('Test that validation of Transaction', () =>
    {
        assert.throws(() =>
        {
            // When attribute `type` is not present
            common.Validator.isValidOtherwiseThrow<common.ITransaction>
            ("Transaction", {
                "inputs": [],
                "outputs": [],
                "payload": ""
            });
        }, new Error("Validation failed: Transaction" +
            " - should have required property 'type'"));

        assert.throws(() =>
        {
            // When attribute `inputs` is not an array
            common.Validator.isValidOtherwiseThrow<common.ITransaction>
            ("Transaction", {
                "type": 1,
                "inputs": {},
                "outputs": [],
                "payload": ""
            });
        }, new Error("Validation failed: Transaction - should be array"));

        // When attribute `type` is not present
        assert.ok(!common.Validator.isValidOtherwiseNoThrow<common.ITransaction>
        ("Transaction", {
            "inputs": [],
            "outputs": [],
            "payload": ""
        }));

        // When attribute `inputs` is not an array
        assert.ok(!common.Validator.isValidOtherwiseNoThrow<common.ITransaction>
        ("Transaction", {
            "type": 1,
            "inputs": {},
            "outputs": [],
            "payload": ""
        }));

        // When everything is normal
        assert.ok(common.Validator.isValidOtherwiseThrow<common.ITransaction>
        ("Transaction",
        {
            "type": 0,
            "inputs": [],
            "outputs": [
                {
                    "value": "400000000000",
                    "address": "GA3DMXTREDC4AIUTHRFIXCKWKF7BDIXRWM2KLV74OPK2" +
                        "OKDM2VJ235GN"
                }
            ],
            "payload": ""
        }));

        // When everything is normal
        assert.ok(common.Validator.isValidOtherwiseThrow<common.ITransaction>
        ("Transaction",
        {
            "type": 0,
            "inputs": [
                {
                    "previous": "0x5d7f6a7a30f7ff591c8649f61eb8a35d034824ed5" +
                        "cd252c2c6f10cdbd2236713dc369ef2a44b62ba113814a9d819" +
                        "a276ff61582874c9aee9c98efa2aa1f10d73",
                    "signature": "0x07557ce0845a7ccbba61643b95e310bd3ae06c41" +
                        "fab9e8761ff3b0e5d28a5d625a3b951223c618910b239e7b779" +
                        "c6c671252a78edff4d0f37bdb25982e4f4228"
                }
            ],
            "outputs": [
                {
                    "value": "400000000000",
                    "address": "GA3DMXTREDC4AIUTHRFIXCKWKF7BDIXRWM2KLV74OPK2" +
                        "OKDM2VJ235GN"
                }
            ],
            "payload": ""
        }));

    });

    it ('Test that validation of Enrollment', () =>
    {
        // When attribute `utxo_key` is not present
        assert.throws(() =>
        {
            common.Validator.isValidOtherwiseThrow<common.IEnrollment>
            ("Enrollment", {
                "random_seed": "0xfb05e20321ae11b2f799a71a736fd172c5dec39540" +
                    "f53d6213cd1b7522898c8bfb86445c6b6db9437899f5917bb5f9c9b" +
                    "e7358ba0ecaa37675692f7d08766950",
                "cycle_length": 1008,
                "enroll_sig": "0x0c48e78972e1b138a37e37ae27a01d5ebdea193088d" +
                    "def2d9883446efe63086925e8803400d7b93d22b1eef5c475098ce0" +
                    "8a5b47e8125cf6b04274cc4db34bfd"
            });
        }, new Error("Validation failed: Enrollment" +
            " - should have required property 'utxo_key'"));

        // When attribute `utxo_key` is not present
        assert.ok(!common.Validator.isValidOtherwiseNoThrow<common.IEnrollment>
        ("Enrollment", {
            "random_seed": "0xfb05e20321ae11b2f799a71a736fd172c5dec39540f53d" +
                "6213cd1b7522898c8bfb86445c6b6db9437899f5917bb5f9c9be7358ba0" +
                "ecaa37675692f7d08766950",
            "cycle_length": 1008,
            "enroll_sig": "0x0c48e78972e1b138a37e37ae27a01d5ebdea193088ddef2" +
                "d9883446efe63086925e8803400d7b93d22b1eef5c475098ce08a5b47e8" +
                "125cf6b04274cc4db34bfd"
        }));

        // When everything is normal
        assert.ok(common.Validator.isValidOtherwiseThrow<common.IEnrollment>
        ("Enrollment", {
            "utxo_key": "0x210b66053c73e7bd7b27673706f0272617d09b8cda76605e9" +
                "1ab66ad1cc3bfc1f3f5fede91fd74bb2d2073de587c6ee495cfb0d981f0" +
                "3a83651b48ce0e576a1a",
            "random_seed": "0xfb05e20321ae11b2f799a71a736fd172c5dec39540f53d" +
                "6213cd1b7522898c8bfb86445c6b6db9437899f5917bb5f9c9be7358ba0" +
                "ecaa37675692f7d08766950",
            "cycle_length": 1008,
            "enroll_sig": "0x0c48e78972e1b138a37e37ae27a01d5ebdea193088ddef2" +
                "d9883446efe63086925e8803400d7b93d22b1eef5c475098ce08a5b47e8" +
                "125cf6b04274cc4db34bfd"
        }));
    });
});

describe ('Test that JSON.stringify of Transaction', () =>
{
    before('Wait for the package libsodium to finish loading', () =>
    {
        return common.SodiumHelper.init();
    });

    it ('Test that JSON of Transaction', () =>
    {
        let tx = new common.Transaction(
            common.TxType.Payment,
            [
                new common.TxInput(
                    new common.Hash("0xd9482016835acc6defdfd060216a5890e00cf8f0a79ab0b83d3385fc723cd45bfea66eb3587a684518ff1756951d38bf4f07abda96dcdea1c160a4f83e377c32"),
                    new common.Signature("0x09039e412cd8bf8cb0364454f6737aaeee9e403e69198e418e87589ea6b3acd6171fe8d29fd6e5d5abc62390fbad0649f62e392be0c3228abd069c14c3fea5bd"))
            ],
            [
                new common.TxOutput(
                    BigInt("1663400000"),
                    new common.PublicKey("GCOMMONBGUXXP4RFCYGEF74JDJVPUW2GUENGTKKJECDNO6AGO32CUWGU")
                ),
                new common.TxOutput(
                    BigInt("24398336600000"),
                    new common.PublicKey("GDID227ETHPOMLRLIHVDJSNSJVLDS4D4ANYOUHXPMG2WWEZN5JO473ZO")
                )
            ],
            new common.DataPayload("0x0001")
        )
        assert.strictEqual(JSON.stringify(tx), `{"type":0,"inputs":[{"utxo":"0xd9482016835acc6defdfd060216a5890e00cf8f0a79ab0b83d3385fc723cd45bfea66eb3587a684518ff1756951d38bf4f07abda96dcdea1c160a4f83e377c32","signature":"0x09039e412cd8bf8cb0364454f6737aaeee9e403e69198e418e87589ea6b3acd6171fe8d29fd6e5d5abc62390fbad0649f62e392be0c3228abd069c14c3fea5bd"}],"outputs":[{"value":"1663400000","address":"GCOMMONBGUXXP4RFCYGEF74JDJVPUW2GUENGTKKJECDNO6AGO32CUWGU"},{"value":"24398336600000","address":"GDID227ETHPOMLRLIHVDJSNSJVLDS4D4ANYOUHXPMG2WWEZN5JO473ZO"}],"payload":"0x0001"}`);
    });

    it ('Test creating a vote data', () =>
    {
        let inputs = [
            new common.TxInput(
                new common.Hash("0x81a326afa790003c32517a2a" +
                    "2556613004e6147edac28d576cf7bcc2daadf4bb60be1f644c2" +
                    "29b775e7894844ec66b2d70ddf407b8196b46bc1dfe42061c74" +
                    "97"),
                common.Signature.init
            ),
            new common.TxInput(
                new common.Hash("0xb82cb96710af2e9804c59d1f" +
                    "1e1679f8b8b69f4c0f6cd79c8c12f365dd766c09aaa4febcc18" +
                    "b3665d33301cb248ac7afd343ac7b98b27beaf246ad12d3b321" +
                    "9a"),
                common.Signature.init
            ),
            new common.TxInput(
                new common.Hash("0x4028965b7408566a66e4cf8c" +
                    "603a1cdebc7659a3e693d36d2fdcb39b196da967914f40ef496" +
                    "6d5b4b1f4b3aae00fbd68ffe8808b070464c2a101d44f4d7b01" +
                    "70"),
                common.Signature.init
            )
        ];

        let outputs = [
            new common.TxOutput(
                BigInt("100000000"),
                new common.PublicKey("GDD5RFGBIUAFCOXQA246BOUPHCK" +
                    "7ZL2NSHDU7DVAPNPTJJKVPJMNLQFW")
            )
        ];

        let keys = [
            new common.Seed("SDAKFNYEIAORZKKCYRILFQKLLOCNPL5SWJ3Y" +
                "Y5NM3ZH6GJSZGXHZEPQS"),
            new common.Seed("SAXA7RLGWM5I7Q34WBKXWLDPZ3NHFHATOZG7" +
                "UUOG5ZGZCM7J64OLTJOT"),
            new common.Seed("SDWAMFTNWY6XLZ2FDGBEMBYIXJTQSSA6OKSP" +
                "H2YVLZH7NDE3LDFC2AJR")
        ];

        let tx = common.Transaction.create(
            inputs,
            outputs,
            keys,
            new common.DataPayload(Buffer.from("vote data"))
        );

        let expected_object = {
            type: 0,
            inputs: [
                {
                    utxo: '0x81a326afa790003c32517a2a2556613004e6147edac28d576cf7bcc2daadf4bb60be1f644c229b775e7894844ec66b2d70ddf407b8196b46bc1dfe42061c7497',
                    signature: '0x00abc0dc823d8952eb28d3ab69c4387b205fedb4c69c2209010042f7ca6dabf76cef09044e2f1ddb3fab099a1e8c63701faa374be0426d4c353ce7254782ca34'
                },
                {
                    utxo: '0xb82cb96710af2e9804c59d1f1e1679f8b8b69f4c0f6cd79c8c12f365dd766c09aaa4febcc18b3665d33301cb248ac7afd343ac7b98b27beaf246ad12d3b3219a',
                    signature: '0x02ed9cf62f551786e4e3ecdf0dad6b32c9f4b47592dbffd7adf0b7048d725c997e710cdc0596eb825aa65c8af3c437442ee8f07f6ccc4162a0f53393112c250e'
                },
                {
                    utxo: '0x4028965b7408566a66e4cf8c603a1cdebc7659a3e693d36d2fdcb39b196da967914f40ef4966d5b4b1f4b3aae00fbd68ffe8808b070464c2a101d44f4d7b0170',
                    signature: '0x048ce34cce366dade98d3d1a60b2558dc9982cd2733758212992d40391f801d0888ccdd3939a85ff21dd95174babff0e0a63567e655a7861649d9e3efa6ba10f'
                }
            ],
            outputs: [
                {
                    value: '100000000',
                    address: 'GDD5RFGBIUAFCOXQA246BOUPHCK7ZL2NSHDU7DVAPNPTJJKVPJMNLQFW'
                }
            ],
            payload: '0x617461642065746f76'
        };

        assert.deepStrictEqual(JSON.stringify(tx), JSON.stringify(expected_object));

        // Verify the signature
        let tx_hash = common.hashFull(tx);
        for (let idx = 0; idx < tx.inputs.length; idx++)
        {
            let key_pair = common.KeyPair.fromSeed(keys[idx]);
            assert.ok(key_pair.address.verify(tx.inputs[idx].signature, tx_hash.data));
        }
    });
});
